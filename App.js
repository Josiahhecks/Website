document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true
    });

    const webhookUrl = document.getElementById('webhookUrl');
    const message = document.getElementById('message');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');

    sendBtn.addEventListener('click', async () => {
        if (!webhookUrl.value) {
            alert('Please enter a webhook URL');
            return;
        }

        try {
            const response = await fetch(webhookUrl.value, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message.value
                })
            });

            if (response.ok) {
                message.value = '';
                showNotification('Message sent successfully!');
            }
        } catch (error) {
            showNotification('Failed to send message', true);
        }
    });

    clearBtn.addEventListener('click', () => {
        webhookUrl.value = '';
        message.value = '';
    });

    function showNotification(text, isError = false) {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = text;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
