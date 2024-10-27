
const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Now define the fetchItems function
async function fetchItems() {
    const { data, error } = await supabase
        .from('items')
        .select('*');

    if (error) {
        console.error('Error fetching items:', error);
        alert('Error fetching items: ' + error.message); 
        return;
    }

    if (data.length === 0) {
        console.log('No items found.');
        alert('No items found in the database.');
    } else {
        populateTable(data);
    }
}

// Call fetchItems after defining it
fetchItems();
