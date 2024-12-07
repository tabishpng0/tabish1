// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/7.17.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/7.17.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/7.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0aHnPWWDssAKGMPbhQ_BNOzpBjtchxfA",
    authDomain: "zaid-database.firebaseapp.com",
    projectId: "zaid-database",
    storageBucket: "zaid-database.firebasestorage.app",
    messagingSenderId: "92728724966",
    appId: "1:92728724966:web:a16801ff5006acc30dda27",
    measurementId: "G-7R6J1B0BHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Initialize cart count
var cartCount = 0;

// Toggle menu function
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Sign up function
function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed up:", userCredential.user.uid);
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
        });
}

// Login function
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user.uid);
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
        });
}

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
}

// Function to handle Add to Cart button click
function addToCart(button) {
    // Get product ID from button's data attribute
    var productId = button.getAttribute('data-id');
    
    // Check if user is authenticated
    var user = auth.currentUser;
    if (!user) {
        alert("Please log in to add items to your cart.");
        return;
    }

    // Get user's unique ID
    var userId = user.uid;

    // Increment cart count
    cartCount++;
    
    // Display updated cart count in HTML element with id="cart-count"
    var cartCountDisplay = document.getElementById('cart-count');
    if (cartCountDisplay) {
        cartCountDisplay.innerText = cartCount;
    }

    // Reference to user's cart in Firebase
    var cartRef = ref(database, 'carts/' + userId + '/' + productId);

    // Add product to user's cart in Firebase
    set(cartRef, {
        productId: productId,
        quantity: 1 // Example quantity; update as needed
    }).then(() => {
        alert("Product added to cart!");
        console.log("Product added to cart:", productId);
    }).catch((error) => {
        console.error("Error adding product to cart:", error.message);
    });
}
// Form validation function
function validateForm() {
    // Get form elements
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    var formMessage = document.getElementById('formMessage');

    // Regular expression for basic email validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Check if all fields are filled
    if (name === '') {
        alert('Please enter your name.');
        return false;
    }
    
    if (email === '') {
        alert('Please enter your email.');
        return false;
    } else if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (subject === '') {
        alert('Please enter a subject.');
        return false;
    }
    
    if (message === '') {
        alert('Please enter your message.');
        return false;
    }

    // If validation passes, display a thank you message
    formMessage.classList.remove('hidden');
    formMessage.innerText = 'Thank you for contacting us!';
    
    return false; // Prevents actual form submission for demo purposes
}


