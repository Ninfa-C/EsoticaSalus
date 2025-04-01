const Url = "https://localhost:7054/api/Account/register";

export const RegisterAccount = async (form) => {
    try {
        const response = await fetch(Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            throw new Error('Errore nella registrazione. Riprova.');
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
