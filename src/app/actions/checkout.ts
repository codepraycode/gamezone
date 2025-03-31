"use server";

const PAY_LINK = "https://sandbox-api-d.squadco.com/transaction/initiate";


type PaymentLinkData = {
    email:string;
    amount: number,
    currency?: "NGN" | "USD",
    name: string;
    redirect?:string;
}

export async function createPaymentLink(data: PaymentLinkData) {
    const { amount, name: customer_name, currency="USD", redirect, ...rest} = data;
    try {
        const body = {
            amount: amount * 100, // Amount in Kobo (50000 Kobo = 500 NGN)
            currency,
            customer_name,
            initiate_type: "inline",
            callback_url: redirect || "http://localhost:3000/verify", // Fix this
            ...rest,
        };

        const headers = {
            Authorization: `Bearer ${process.env.SQUAD_SK}`,
            "Content-Type": "application/json",
        };

        const result = await fetch(PAY_LINK, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        if (!result.ok) {
            throw new Error(`Payment API Error: ${result.statusText}`);
        }

        const resp = await result.json();

        const obj = {
            ref: resp.data.transaction_ref,
            amount: resp.data.transaction_amount,
            checkout_url: resp.data.checkout_url,
        }

        console.dir(obj);

        return obj; // Return the response so frontend can use it
    } catch (error: any) {
        console.error("Payment Error:", error.message);
        console.dir(error);
        throw new Error("Failed to create payment link");
    }
}