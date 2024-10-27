import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const table = document.getElementById('itemsTable');

    let currentEditableCell = null;
    let preValue = '';

    // Toggle menu visibility and hamburger appearance on click
    hamburger.addEventListener('click', function(event) {
        event.stopPropagation();  // Prevent menu from closing immediately
        menu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('open');
        }
    });

    // Function to make a cell editable
    function makeCellEditable(cell) {
        cell.contentEditable = true;
        cell.focus();
        preValue = cell.textContent.trim();

        if (cell.cellIndex === 2) {
            cell.addEventListener('input', restrictToInteger);
        } else if (cell.cellIndex === 3) {
            cell.addEventListener('input', restrictToFloat2dec);
        }
    }

    // Function to restrict input to integers
    function restrictToInteger(event) {
        const value = event.target.textContent;
        if (!/^\d*$/.test(value)) {
            event.target.textContent = value.replace(/[^0-9]/g, '');
        }
    }

    // Function to restrict input to floats with up to 2 decimal places
    function restrictToFloat2dec(event) {
        const value = event.target.textContent;
        const regex = /^\d*(\.\d{0,2})?$/;
        if (!regex.test(value)) {
            event.target.textContent = value.slice(0, -1);
        }
    }

    // Function to make the cell non-editable and save changes
    function makeCellNonEditable(cell) {
        cell.contentEditable = false;
        cell.removeEventListener('input', restrictToInteger);
        cell.removeEventListener('input', restrictToFloat2dec);
    }

    // Add event listener for double-clicking the table to edit cells
    table.addEventListener('dblclick', function(event) {
        const target = event.target;
        if (target.tagName === 'TD') {
            if (currentEditableCell && currentEditableCell !== target) {
                makeCellNonEditable(currentEditableCell);
            }
            makeCellEditable(target);
            currentEditableCell = target;
        }
    });

    // Handle when 'Enter' or 'Escape' keys are pressed
    table.addEventListener('keydown', function(event) {
        const target = event.target;
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault();
            makeCellNonEditable(target);
            currentEditableCell = null;
        }
    });

    // Close the editable state when clicking outside the cell
    document.addEventListener('click', function(event) {
        if (currentEditableCell && !currentEditableCell.contains(event.target) && !table.contains(event.target)) {
            makeCellNonEditable(currentEditableCell);
            currentEditableCell = null;
        }
    });

    // Fetch items from Supabase and populate the table
    async function fetchItems() {
        const { data, error } = await supabase
            .from('items')
            .select('*');
        
        if (error) {
            console.error('Error fetching items:', error);
        } else {
            console.log('Items:', data);
            populateTable(data);
        }
    }

    // Populate table with items data
    function populateTable(items) {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.qntty}</td>
                <td>${item.price}</td>
                <td>${item.rmrqs}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Initialize by fetching items
    fetchItems();
});
