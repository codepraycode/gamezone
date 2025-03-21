"use server";

const PAY_LINK = "https://sandbox-api-d.squadco.com/transaction/initiate";

export async function createPaymentLink() {
    try {
        const body = {
            email: "preciousbusiness10@gmail.com",
            amount: 50000, // Amount in Kobo (50000 Kobo = 500 NGN)
            currency: "NGN",
            customer_name: "Precious",
            initiate_type: "inline",
            callback_url: "http://localhost:3000", // Fix this
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