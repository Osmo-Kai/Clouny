        // Variables to store selections
        let dateType = '';
        let dateTheme = '';
        let dateTime = '';
        let dietaryPreferences = [];
        let specialRequests = '';
        let selectedDate = '';

        // Function to show a specific screen and hide others
        function showScreen(screenId) {
            const screens = ['welcome-screen', 'date-type-screen', 'theme-screen', 'preferences-screen', 'final-screen', 'confirmation-screen'];
            screens.forEach(screen => {
                document.getElementById(screen).classList.add('hidden');
            });
            document.getElementById(screenId).classList.remove('hidden');
        }

        // Create confetti effect
        function createConfetti() {
            const colors = ['#ff758c', '#ff7eb3', '#ef5da8', '#c792ea', '#a18cd1', '#fbc2eb', '#84fab0', '#8fd3f4', '#f6d365', '#fda085'];
            
            for (let i = 0; i < 150; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = -10 + 'px';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                document.body.appendChild(confetti);
                
                // Animate the confetti
                const duration = Math.random() * 3 + 2;
                const delay = Math.random() * 2;
                
                confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: duration * 1000,
                    delay: delay * 1000,
                    fill: 'forwards'
                });
                
                // Remove confetti after animation
                setTimeout(() => {
                    document.body.removeChild(confetti);
                }, (duration + delay) * 1000);
            }
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Yes button
            document.getElementById('yes-btn').addEventListener('click', function() {
                showScreen('date-type-screen');
                createConfetti();
            });

            // No button - make it run away
            document.getElementById('no-btn').addEventListener('mouseover', function() {
                const button = this;
                const maxX = window.innerWidth - button.offsetWidth;
                const maxY = window.innerHeight - button.offsetHeight;
                
                button.style.position = 'absolute';
                button.style.left = Math.random() * maxX + 'px';
                button.style.top = Math.random() * maxY + 'px';
            });
            
            document.getElementById('no-btn').addEventListener('click', function() {
                document.getElementById('yes-btn').click();
            });

            // Date type selection
            document.querySelectorAll('.date-card').forEach(card => {
                card.addEventListener('click', function() {
                    dateType = this.dataset.type;
                    document.querySelectorAll('.date-card').forEach(c => {
                        c.style.borderColor = 'transparent';
                    });
                    this.style.borderColor = '#ff7eb3';
                    
                    setTimeout(() => {
                        showScreen('theme-screen');
                    }, 500);
                });
            });

            // Theme selection
            document.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', function() {
                    dateTheme = this.dataset.theme;
                    document.querySelectorAll('.theme-option').forEach(o => {
                        o.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });

            // Theme next button
            document.getElementById('theme-next').addEventListener('click', function() {
                if (dateTheme) {
                    showScreen('preferences-screen');
                } else {
                    alert('Please select a theme for your date');
                }
            });

            // Submit preferences
            document.getElementById('submit-preferences').addEventListener('click', function() {
                // Get time preference
                const timeRadios = document.querySelectorAll('input[name="time"]');
                for (const radio of timeRadios) {
                    if (radio.checked) {
                        dateTime = radio.value;
                        break;
                    }
                }

                // Get dietary preferences
                dietaryPreferences = [];
                const dietCheckboxes = document.querySelectorAll('input[name="diet"]');
                for (const checkbox of dietCheckboxes) {
                    if (checkbox.checked) {
                        dietaryPreferences.push(checkbox.value);
                    }
                }

                // Get special requests
                specialRequests = document.getElementById('special-requests').value;

                // Generate date summary
                let summary = `<p class="mb-4">Based on your preferences, I'm planning a <span style="color: #ff7eb3; font-weight: bold;">${dateType}</span> date with a <span style="color: #c792ea; font-weight: bold;">${dateTheme}</span> theme.</p>`;
                
                if (dateTime) {
                    summary += `<p class="mb-2">We'll go in the <span style="color: #ff7eb3; font-weight: bold;">${dateTime}</span>.</p>`;
                }
                
                if (dietaryPreferences.length > 0) {
                    summary += `<p class="mb-2">I'll make sure to consider your dietary preferences: <span style="color: #c792ea; font-weight: bold;">${dietaryPreferences.join(', ')}</span>.</p>`;
                }
                
                if (specialRequests) {
                    summary += `<p class="mb-2">And I'll keep in mind your special request: "<em style="color: #ff7eb3;">${specialRequests}</em>"</p>`;
                }

                document.getElementById('date-summary').innerHTML = summary;
                showScreen('final-screen');
            });

            // Confirm date
            document.getElementById('confirm-date').addEventListener('click', function() {
                selectedDate = document.getElementById('date-picker').value;
                
                if (!selectedDate) {
                    alert('Please select a date for our special time together');
                    return;
                }
                
                // Format the date nicely
                const dateObj = new Date(selectedDate);
                const formattedDate = dateObj.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                document.getElementById('confirmation-message').innerHTML = `
                    <p class="mb-4">I can't wait to see you on <span style="color: #ff7eb3; font-weight: bold;">${formattedDate}</span>!</p>
                    <p>We're going to have an amazing <span style="color: #c792ea; font-weight: bold;">${dateType} ${dateTheme}</span> date together.</p>
                `;
                
                showScreen('confirmation-screen');
                createConfetti();
            });

            // Restart button
            document.getElementById('restart-btn').addEventListener('click', function() {
                // Reset all selections
                dateType = '';
                dateTheme = '';
                dateTime = '';
                dietaryPreferences = [];
                specialRequests = '';
                selectedDate = '';
                
                // Reset all form elements
                document.querySelectorAll('input[type="radio"]').forEach(radio => {
                    radio.checked = false;
                });
                
                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                document.getElementById('special-requests').value = '';
                document.getElementById('date-picker').value = '';
                
                // Reset styling
                document.querySelectorAll('.date-card').forEach(card => {
                    card.style.borderColor = 'transparent';
                });
                
                document.querySelectorAll('.theme-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Show welcome screen
                showScreen('welcome-screen');
            });
        });

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96968a0b21b55162',t:'MTc1NDIzMTcwMi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();