/**
 * Local Database Engine
 * Simulates a persistent database using Browser LocalStorage.
 * Stores data in JSON format on the user's laptop.
 */

const DB_KEYS = {
    USERS: 'wanderlust_users',
    SESSIONS: 'wanderlust_sessions'
};

class LocalDB {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(DB_KEYS.USERS)) {
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify([]));
        }
        if (!localStorage.getItem(DB_KEYS.SESSIONS)) {
            localStorage.setItem(DB_KEYS.SESSIONS, JSON.stringify(null));
        }
    }

    // --- User Operations ---

    addUser(user) {
        const users = this.getUsers();
        // Check for duplicate email
        if (users.find(u => u.email === user.email)) {
            throw new Error('User already exists with this email.');
        }
        // Initialize user with interaction arrays
        user.likes = [];
        user.bookings = [];

        users.push(user);
        this.saveUsers(users);
        return user;
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    }

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    }

    saveUsers(users) {
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    }

    // --- Interactions ---

    toggleLike(email, destId) {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex === -1) return false;

        const user = users[userIndex];
        if (!user.likes) user.likes = []; // Backwards compatibility

        const likeIndex = user.likes.indexOf(destId);
        let isLiked = false;

        if (likeIndex > -1) {
            user.likes.splice(likeIndex, 1); // Unlike
        } else {
            user.likes.push(destId); // Like
            isLiked = true;
        }

        users[userIndex] = user;
        this.saveUsers(users);

        // Update Session if matches
        const currentSession = this.getSession();
        if (currentSession && currentSession.email === email) {
            currentSession.likes = user.likes;
            localStorage.setItem(DB_KEYS.SESSIONS, JSON.stringify(currentSession));
        }

        return isLiked;
    }

    isLiked(destId) {
        const session = this.getSession();
        if (!session || !session.likes) return false;
        return session.likes.includes(destId);
    }

    addBooking(email, destId, type) {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex === -1) return;

        const user = users[userIndex];
        if (!user.bookings) user.bookings = [];

        user.bookings.push({
            id: Date.now(),
            destId: destId,
            type: type,
            date: new Date().toISOString()
        });

        users[userIndex] = user;
        this.saveUsers(users);
        console.log(`Booking recorded: ${type} to ${destId}`);
    }

    // --- Session Operations (Mock Token) ---

    createSession(user) {
        // Strip sensitive data
        const sessionUser = {
            name: user.name,
            email: user.email,
            id: user.id || Date.now() // Simple ID generation
        };
        localStorage.setItem(DB_KEYS.SESSIONS, JSON.stringify(sessionUser));
        return sessionUser;
    }

    getSession() {
        return JSON.parse(localStorage.getItem(DB_KEYS.SESSIONS));
    }

    clearSession() {
        localStorage.setItem(DB_KEYS.SESSIONS, JSON.stringify(null));
    }
}

// Export a singleton instance
const db = new LocalDB();
console.log('Local Database Initialized');
