export async function POST(request) {
  try {
    const { amount, currency = "USD", receipt } = await request.json()
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: "Razorpay not configured." }, { status: 500 })
    }
    const orderPayload = {
      amount,
      currency,
      receipt,
      payment_capture: 1,
    }

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64"),
      },
      body: JSON.stringify(orderPayload),
    })

    const data = await res.json()
    if (!res.ok) {
      return Response.json({ error: data?.error?.description || "Failed to create order" }, { status: 500 })
    }
    return Response.json(data)
  } catch (e) {
    return Response.json({ error: e.message || "Server error" }, { status: 500 })
  }
}
