"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/header"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useLanguage } from "@/contexts/language-context"
import Footer from "@/components/footer"

const plans = [
  {
    name: "Basic",
    price: 4.99,
    features: [
      "Acceso a ebooks gratuitos",
      "Noticias espaciales semanales",
      "Newsletter mensual",
      "Acceso al foro de la comunidad",
      "Wallpapers HD exclusivos",
      "1 evento virtual al mes"
    ],
    color: "blue-400",
  },
  {
    name: "Pro",
    price: 12.99,
    features: [
      "Todo lo de Basic",
      "Revista digital mensual",
      "Acceso a ebooks premium",
      "Comentar y valorar contenido",
      "Descarga de recursos educativos",
      "Acceso a eventos presenciales",
      "Descuentos en merchandising",
      "2 eventos virtuales al mes"
    ],
    color: "purple-400",
  },
  {
    name: "Explorer",
    price: 19.99,
    features: [
      "Todo lo de Pro",
      "Acceso anticipado a contenido",
      "Recursos exclusivos de NASA/ESA",
      "Soporte prioritario 24/7",
      "Acceso VIP a eventos",
      "Revista física mensual",
      "Contenido personalizado",
      "Tutorías astronómicas mensuales",
      "Kit de bienvenida físico"
    ],
    color: "pink-400",
  },
]

const CARD_TYPES = [
  {
    name: "Visa",
    icon: "/visa.svg",
    pattern: /^4/,
    validLength: [16],
  },
  {
    name: "Mastercard",
    icon: "/mastercard.svg",
    pattern: /^(5[1-5]|2[2-7])/, // 51-55, 2221-2720
    validLength: [16],
  },
]

function getCardType(number: string) {
  const clean = number.replace(/\D/g, "");
  return CARD_TYPES.find(type => type.pattern.test(clean));
}

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
}

function luhnCheck(cardNumber: string) {
  const arr = (cardNumber + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  const lastDigit = arr.shift()!;
  let sum = arr.reduce(
    (acc, val, idx) =>
      idx % 2 === 0
        ? acc + ((val * 2 > 9) ? val * 2 - 9 : val * 2)
        : acc + val,
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
}

type SubscriptionUpgradeProps = {
  userSubscription: { plan: string, since: Date };
  user: any;
  setUserSubscription: (val: { plan: string, since: Date }) => void;
  t: (key: string) => string;
  router: any;
};

function addOneMonth(date: Date) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + 1)
  return d
}

function SubscriptionUpgrade({ userSubscription, user, setUserSubscription, t, router }: SubscriptionUpgradeProps) {
  const planOrder = ["Basic", "Pro", "Explorer"];
  const userPlanIndex = userSubscription ? planOrder.indexOf(userSubscription.plan) : -1;
  const canUpgrade = userPlanIndex > -1 && userPlanIndex < plans.length - 1;
  const nextPlans = canUpgrade ? plans.slice(userPlanIndex + 1) : [];
  const [upgradeStep, setUpgradeStep] = useState<'select' | 'pay' | 'success'>("select");
  const [selectedUpgrade, setSelectedUpgrade] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', card: '', expiry: '', cvc: '' });
  const [cardType, setCardType] = useState<typeof CARD_TYPES[0] | null>(null);
  const [error, setError] = useState('');

  const currentPlan = plans[userPlanIndex];
  const upgradePlan = selectedUpgrade !== null ? nextPlans[selectedUpgrade] : null;
  const diff = upgradePlan ? (upgradePlan.price - currentPlan.price) : 0;

  function handleCardInput(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardNumber(e.target.value)
    setForm(f => ({ ...f, card: formatted }))
    const type = getCardType(formatted)
    setCardType(type || null)
  }
  function handleExpiryInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setForm(f => ({ ...f, expiry: value }));
  }
  function handleCvcInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setForm(f => ({ ...f, cvc: value }));
  }
  async function handleUpgradePay(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const cleanCard = form.card.replace(/\D/g, "");
    if (!form.name || !form.card || !form.expiry || !form.cvc) {
      setError(t("checkout.errorFill"));
      return;
    }
    if (!cardType) {
      setError(t("checkout.errorCardType"));
      return;
    }
    if (!cardType.validLength.includes(cleanCard.length)) {
      setError(t("checkout.errorCardLength").replace("{n}", String(cardType.validLength[0])));
      return;
    }
    if (!luhnCheck(cleanCard)) {
      setError(t("checkout.errorLuhn"));
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry)) {
      setError(t("checkout.errorExpiry"));
      return;
    }
    if (!/^\d{3}$/.test(form.cvc)) {
      setError(t("checkout.errorCvc"));
      return;
    }
    try {
      if (!user) throw new Error("Usuario no autenticado");
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { subscription: upgradePlan.name, subscriptionSince: Timestamp.now() }, { merge: true });
      setUserSubscription({ plan: upgradePlan.name, since: new Date() });
      setUpgradeStep("success");
    } catch (err) {
      setError(t("subscription.error"));
    }
  }
  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-md w-full mx-auto mt-4 p-6 bg-green-900/30 border border-green-700 rounded-2xl text-green-300 text-sm shadow flex flex-col gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("buttons.back")}</span>
          </button>
          <div className="mb-1 font-semibold text-green-200">{t("subscription.active")}</div>
          <div>
            {t("subscription.plan")}: <span className="font-bold">{t(`plans.${userSubscription.plan.toLowerCase()}`)}</span>
          </div>
          <div>
            {t("subscription.since")}: <span className="font-mono">{userSubscription.since ? userSubscription.since.toLocaleDateString() : '-'}</span>
          </div>
          <div>
            {t("subscription.until")}: <span className="font-mono">{userSubscription.since ? addOneMonth(userSubscription.since).toLocaleDateString() : '-'}</span>
          </div>
          {canUpgrade && upgradeStep === 'select' && (
            <>
              <div className="mt-2 text-green-100">{t("subscription.upgradeMsg")}</div>
              {nextPlans.map((upgradePlan, i) => {
                const diff = upgradePlan.price - plans[userPlanIndex].price;
                return (
                  <button
                    key={upgradePlan.name}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2"
                    onClick={() => { setSelectedUpgrade(i); setUpgradeStep('pay'); }}
                  >
                    {t("subscription.upgradeBtn")} {t(`plans.${upgradePlan.name.toLowerCase()}`)} ({diff.toFixed(2)}€)
                  </button>
                );
              })}
            </>
          )}
          {canUpgrade && upgradeStep === 'pay' && upgradePlan && (
            <form onSubmit={handleUpgradePay} className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 mb-2 min-h-10">
                <span className="text-lg font-bold">
                  {t(`plans.${upgradePlan.name.toLowerCase()}`)} - {diff.toFixed(2)}€
                </span>
              </div>
              <div className="flex items-center gap-2">
                {cardType && cardType.name === 'Visa' && (
                  <div className="bg-white rounded-md p-1 flex items-center justify-center h-10 w-14 border border-zinc-300">
                    <img src="/visa.png" alt="Visa" className="h-7 w-auto" />
                  </div>
                )}
                {cardType && cardType.name === 'Mastercard' && (
                  <div className="bg-white rounded-md p-1 flex items-center justify-center h-10 w-14 border border-zinc-300">
                    <img src="/mastercard.png" alt="Mastercard" className="h-7 w-auto" />
                  </div>
                )}
                <input
                  type="text"
                  placeholder={t("checkout.cardPlaceholder")}
                  className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 flex-1"
                  value={form.card}
                  onChange={handleCardInput}
                  required
                  maxLength={19}
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
              </div>
              <div className="flex flex-col items-start mt-1 mb-2">
                <img src="/cards-accepted.png" alt="Visa y Mastercard aceptadas" className="h-7 mb-1" />
                <span className="text-xs text-zinc-400">{t("checkout.acceptedCards")}</span>
              </div>
              <input
                type="text"
                placeholder={t("checkout.namePlaceholder")}
                className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder={t("checkout.expiryPlaceholder")}
                className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 w-1/2"
                value={form.expiry}
                onChange={handleExpiryInput}
                required
                maxLength={5}
                inputMode="numeric"
                autoComplete="cc-exp"
              />
              <input
                type="text"
                placeholder={t("checkout.cvcPlaceholder")}
                className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 w-1/2"
                value={form.cvc}
                onChange={handleCvcInput}
                required
                maxLength={3}
                inputMode="numeric"
                autoComplete="cc-csc"
              />
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors text-lg mt-2"
              >
                {t("checkout.pay")} {diff.toFixed(2)}€
              </button>
              <button
                type="button"
                className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-2 rounded transition-colors text-sm mt-2"
                onClick={() => setUpgradeStep('select')}
              >
                {t("checkout.backPlans")}
              </button>
            </form>
          )}
          {upgradeStep === 'success' && (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <div className="text-2xl font-bold mb-2 text-green-400">{t("subscription.success")}</div>
              <div className="text-zinc-300 mb-6">{t("subscription.thanks")} <span className="font-bold">{upgradePlan ? t(`plans.${upgradePlan.name.toLowerCase()}`) : ''}</span> Cosmic Explorer.</div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
                onClick={() => router.push("/")}
              >
                {t("buttons.back")}
              </button>
            </div>
          )}
          {!canUpgrade && <div className="mt-2 text-green-200">{t("subscription.currentMax")}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const [selected, setSelected] = useState(0)
  const [step, setStep] = useState<'plans' | 'pay' | 'success'>('plans')
  const [form, setForm] = useState({ name: '', card: '', expiry: '', cvc: '' })
  const [error, setError] = useState('')
  const [cardType, setCardType] = useState<typeof CARD_TYPES[0] | null>(null)
  const router = useRouter()
  const [userSubscription, setUserSubscription] = useState<{ plan: string, since: Date } | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!user) {
      router.replace("/")
      return
    }
    // Consultar suscripción actual
    const fetchSubscription = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().subscription) {
          setUserSubscription({
            plan: userSnap.data().subscription,
            since: userSnap.data().subscriptionSince?.toDate?.() || null
          })
        } else {
          setUserSubscription(null)
        }
      } catch (err) {
        setUserSubscription(null)
      }
    }
    fetchSubscription();
  }, [user, router])

  if (!user) return null;

  // Si el usuario ya tiene suscripción, mostrar solo el upgrade
  if (userSubscription) {
    return <><SubscriptionUpgrade userSubscription={userSubscription} user={user} setUserSubscription={setUserSubscription} t={t} router={router} /> <Footer /></>;
  }

  function handleCardInput(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardNumber(e.target.value)
    setForm(f => ({ ...f, card: formatted }))
    const type = getCardType(formatted)
    setCardType(type || null)
  }

  function handleExpiryInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setForm(f => ({ ...f, expiry: value }));
  }

  function handleCvcInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setForm(f => ({ ...f, cvc: value }));
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const cleanCard = form.card.replace(/\D/g, "")
    if (!form.name || !form.card || !form.expiry || !form.cvc) {
      setError("Por favor, rellena todos los campos.")
      return
    }
    if (!cardType) {
      setError("Introduce un número de tarjeta válido (Visa o Mastercard).")
      return
    }
    if (!cardType.validLength.includes(cleanCard.length)) {
      setError(`La tarjeta debe tener ${cardType.validLength[0]} dígitos.`)
      return
    }
    if (!luhnCheck(cleanCard)) {
      setError("El número de tarjeta no es válido.")
      return
    }
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry)) {
      setError("Fecha de caducidad inválida. Usa MM/AA.")
      return
    }
    if (!/^\d{3}$/.test(form.cvc)) {
      setError("CVC inválido.")
      return
    }
    // --- FIRESTORE LOGIC ---
    try {
      if (!user) throw new Error("Usuario no autenticado");
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().subscription) {
        setError("Ya tienes una suscripción activa. Si necesitas cambiarla, contacta con soporte.");
        return;
      }
      await setDoc(userRef, { subscription: plans[selected].name, subscriptionSince: Timestamp.now() }, { merge: true });
      setUserSubscription({ plan: plans[selected].name, since: new Date() })
      setStep('success')
    } catch (err: any) {
      setError("Error al guardar la suscripción. Inténtalo de nuevo o contacta con soporte.");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-zinc-950 rounded-2xl shadow-2xl p-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Suscripción Cosmic Explorer</h1>
          {step === 'plans' && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {plans.map((plan, i) => (
                  <div
                    key={plan.name}
                    className={`rounded-xl border-2 ${selected === i ? `border-${plan.color}` : "border-zinc-800"} bg-zinc-900 p-6 flex flex-col items-center transition-all cursor-pointer hover:border-blue-400`}
                    onClick={() => setSelected(i)}
                  >
                    <div className={`text-3xl font-bold mb-2 text-${plan.color}`}>{plan.name}</div>
                    <div className="text-4xl font-extrabold mb-4">{plan.price}€<span className="text-lg font-normal">/mes</span></div>
                    <ul className="mb-4 space-y-2 text-zinc-300 text-sm">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2"><CheckCircle className={`w-4 h-4 text-${plan.color}`} /> {f}</li>
                      ))}
                    </ul>
                    {selected === i && <div className={`mt-2 text-xs text-${plan.color} font-bold`}>Seleccionado</div>}
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors text-lg mt-2"
                onClick={() => setStep('pay')}
              >
                Continuar con {plans[selected].name}
              </button>
            </>
          )}
          {step === 'pay' && (
            <form onSubmit={handlePay} className="max-w-md mx-auto flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 mb-2 min-h-10">
                <span className="text-lg font-bold">
                  {plans[selected].name} - {plans[selected].price}€
                </span>
              </div>
              <div className="flex items-center gap-2">
                {cardType && cardType.name === 'Visa' && (
                  <div className="bg-white rounded-md p-1 flex items-center justify-center h-10 w-14 border border-zinc-300">
                    <img src="/visa.png" alt="Visa" className="h-7 w-auto" />
                  </div>
                )}
                {cardType && cardType.name === 'Mastercard' && (
                  <div className="bg-white rounded-md p-1 flex items-center justify-center h-10 w-14 border border-zinc-300">
                    <img src="/mastercard.png" alt="Mastercard" className="h-7 w-auto" />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 flex-1"
                  value={form.card}
                  onChange={handleCardInput}
                  required
                  maxLength={19}
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
              </div>
              <div className="flex flex-col items-start mt-1 mb-2">
                <img src="/cards-accepted.png" alt="Visa y Mastercard aceptadas" className="h-7 mb-1" />
                <span className="text-xs text-zinc-400">Solo se aceptan tarjetas Visa y Mastercard</span>
              </div>
              <input
                type="text"
                placeholder="Nombre en la tarjeta"
                className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder="MM/AA"
                className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 w-1/2"
                value={form.expiry}
                onChange={handleExpiryInput}
                required
                maxLength={5}
                inputMode="numeric"
                autoComplete="cc-exp"
              />
              <input
                type="text"
                placeholder="CVC"
                className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 w-1/2"
                value={form.cvc}
                onChange={handleCvcInput}
                required
                maxLength={3}
                inputMode="numeric"
                autoComplete="cc-csc"
              />
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors text-lg mt-2"
              >
                Pagar {plans[selected].price}€
              </button>
              <button
                type="button"
                className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-2 rounded transition-colors text-sm mt-2"
                onClick={() => setStep('plans')}
              >
                Volver a cuotas
              </button>
            </form>
          )}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <div className="text-2xl font-bold mb-2 text-green-400">¡Pago realizado!</div>
              <div className="text-zinc-300 mb-6">Gracias por suscribirte a la cuota <span className="font-bold">{plans[selected].name}</span> de Cosmic Explorer.</div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
                onClick={() => router.push("/")}
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
} 