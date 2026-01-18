/**
 * Auth Service
 * Handles Application Logic for Authentication.
 * Connects UI to LocalDB.
 */

class AuthService {
    constructor() {
        this.currentUser = null;
        this.loadUser();
    }

    loadUser() {
        if (typeof db === 'undefined') {
            console.error('Database not loaded!');
            return;
        }
        this.currentUser = db.getSession();
        this.updateUI();
    }

    register(name, email, password) {
        // Basic Validation
        if (!name || !email || !password) {
            return { success: false, message: 'All fields are required' };
        }

        try {
            // "Hash" password (MOCK - DO NOT DO THIS IN PROD)
            // For a school project local simplified backend, this is acceptable storage.
            const newUser = {
                name,
                email,
                password: btoa(password), // Simple encoding to look like a hash
                joined: new Date().toISOString()
            };

            db.addUser(newUser);
            const session = db.createSession(newUser);
            this.currentUser = session;
            this.updateUI();

            return { success: true, message: 'Registration Successful!' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    login(email, password) {
        const user = db.findUserByEmail(email);

        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        // Verify "Hash"
        if (user.password !== btoa(password)) {
            return { success: false, message: 'Invalid password.' };
        }

        const session = db.createSession(user);
        this.currentUser = session;
        this.updateUI();

        return { success: true, message: 'Login Successful!' };
    }

    logout() {
        db.clearSession();
        this.currentUser = null;
        this.updateUI();
        window.location.reload(); // Refresh to clear state
    }

    updateUI() {
        const navContainer = document.querySelector('.nav-auth-section');
        const mobileContainer = document.querySelector('.mobile-auth-section');

        // Can't find elements yet if DOM isn't ready, retry logic handled in script.js
        // But we can dispatch an event
        const event = new CustomEvent('authChanged', { detail: this.currentUser });
        document.dispatchEvent(event);
    }
}

const auth = new AuthService();

// Developer Tool: View Users
window.devShowUsers = function() {
    if (typeof db !== 'undefined') {
        const users = db.getUsers();
        console.table(users);
        console.log("Total Users:", users.length);
        alert(`Check Console for ${users.length} registered users.`);
    } else {
        console.error("Database not initialized.");
    }
};
