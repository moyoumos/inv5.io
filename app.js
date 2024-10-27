// Get elements for the menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const table = document.getElementById('itemsTable'); // Editable table

let currentEditableCell = null; // Track the currently editable cell
let preValue = 0; 

// Toggle menu and button appearance
hamburger.addEventListener('click', function(event) {
    event.stopPropagation();  // Prevent closing when clicking on the menu
    menu.classList.toggle('active');
    hamburger.classList.toggle('open');
    // Change button lines to 'X'
    if (hamburger.classList.contains('open')) {
        hamburger.innerHTML = '<div class="line" style="transform: rotate(45deg);"></div><div class="line" style="opacity: 0;"></div><div class="line" style="transform: rotate(-45deg);"></div>';
    } else {
        // Reset lines back to the three lines (hamburger)
        hamburger.innerHTML = '<div class="line"></div><div class="line"></div><div class="line"></div>';
    }
});

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.innerHTML = '<div class="line"></div><div class="line"></div><div class="line"></div>';
    }
});

// Function to make a cell editable
function makeCellEditable(cell) {
    cell.contentEditable = true;
    cell.focus();
    preValue = cell.textContent.trim();
    // Add input event listener for Qntty column
    if (cell.cellIndex === 2) { // Qntty column
        cell.addEventListener('input', restrictToInteger);
    } else if (cell.cellIndex === 3) { // Price column
        cell.addEventListener('input', restrictToFloat2dec);
    }
}

// Function to restrict input to integers
function restrictToInteger(event) {
    const value = event.target.textContent;
    // Allow only digits and prevent the user from typing anything else
    if (!/^\d*$/.test(value)) {
        event.target.textContent = value.replace(/[^0-9]/g, ''); // Remove non-digit characters
    }
}

// Function to restrict input to floats with up to 2 decimal places
function restrictToFloat2dec(event) {
    const value = event.target.textContent;
    // Match a number with up to 2 decimal places
    const regex = /^\d*(\.\d{0,2})?$/;
    // If the current value doesn't match the regex, remove the last character
    if (!regex.test(value)) {
        event.target.textContent = value.slice(0, -1); // Remove last character
    }
}

// Function to make the cell non-editable and save changes
function makeCellNonEditable(cell) {
    cell.contentEditable = false;
}

// Add event listener for double-clicking the table to edit cells
table.addEventListener('dblclick', function(event) {
    let target = event.target;
    // If the target is a table cell (TD)
    if (target.tagName === 'TD') {
        // If there's already an editable cell, make it non-editable
        if (currentEditableCell && currentEditableCell !== target) {
            makeCellNonEditable(currentEditableCell);
        }
        // Make the clicked cell editable
        makeCellEditable(target);
        currentEditableCell = target; // Set the current editable cell
    }
});

// Handle when 'Enter' or 'Escape' keys are pressed
table.addEventListener('keydown', function(event) {
    let target = event.target;
    // If 'Enter' or 'Escape' is pressed, make the cell non-editable
    if (event.key === 'Enter' || event.key === 'Escape') {
        event.preventDefault();  // Prevent new line on 'Enter'
        makeCellNonEditable(target);
        currentEditableCell = null; // Clear the current editable cell reference
    }
});

// Close the editable state when clicking outside the cell
document.addEventListener('click', function(event) {
    // Check if the current editable cell exists and the clicked target is not the cell or table
    if (currentEditableCell && !currentEditableCell.contains(event.target)) {
        makeCellNonEditable(currentEditableCell);
        currentEditableCell = null; // Clear the current editable cell reference
    }
});

// Alpine.js functionality to fetch and populate items
document.addEventListener('alpine:init', () => {
    Alpine.data('itemTableApp', () => ({
        items: [],
        async fetchItems() {
            const { createClient } = supabase;
            const supabaseUrl = 'https://YOUR_SUPABASE_URL'; // Replace with your Supabase URL
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
            const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

            const { data, error } = await supabase
                .from('items')
                .select('*');

            if (error) {
                console.error('Error fetching items:', error);
            } else {
                this.items = data; // Populate items with data from Supabase
            }
        },
        init() {
            this.fetchItems(); // Fetch items when component initializes
        }
    }));
});
