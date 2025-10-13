import React from "react";

function Webhook() {
    const webhookURL = "https://webhook.site/e5638f51-f6aa-442e-b13e-890d90c45e94";

    const sendData = async () => {
        const data = {
            key1: "myusername",
            email: "mymail@gmail.com",
            name: "Isaac",
            lastname: "Doe",
            age: 27
        };

        try {
            const response = await fetch(webhookURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Response from Webhook:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">POST JSON Data with React</h1>
            <div className="text-center">
                <button className="btn btn-primary btn-lg mb-4" onClick={sendData}>
                    Send JSON to Webhook
                </button>
            </div>
        </div>
    );
}

export default Webhook;
