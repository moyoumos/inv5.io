const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
const supabase = createClient(supabaseUrl, supabaseKey);

// Get the table body element to populate data
const tableBody = document.querySelector('#itemsTable tbody');

// Function to fetch items from Supabase and populate the table
async function fetchItems() {
    const { data, error } = await supabase
        .from('items')
        .select('*');
    if (error) {
        console.error('Error fetching items:', error);
        alert('Error fetching items: ' + error.message); // Alert to see the error in the UI
        return;
    }
    if (data.length === 0) {
        console.log('No items found.');
        alert('No items found in the database.'); // Alert if no data is returned
    } else {
        populateTable(data);
    }
}


// Function to populate the table with item data
function populateTable(items) {
    // Clear the existing rows in the table body
    tableBody.innerHTML = '';

    // Loop through the items and create table rows
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.remarks}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch items on page load
fetchItems();
