// Wait until the DOM is fully loaded before initializing Supabase
document.addEventListener('DOMContentLoaded', () => {
    // Check if createClient is available
    if (typeof supabase === 'undefined' || typeof supabase.createClient !== 'function') {
        console.error('Supabase library did not load correctly.');
        return;
    }

    // Initialize Supabase client
const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Log the client to confirm initialization
    console.log('Supabase client initialized:', supabase);

    // Fetch items to test the connection
    async function fetchItems() {
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*');

            if (error) {
                console.error('Error fetching items:', error);
                alert('Error fetching items: ' + error.message);
                return;
            }

            if (data && data.length > 0) {
                console.log('Items:', data);
                populateTable(data); // Call your table population function here
            } else {
                console.log('No items found.');
                alert('No items found in the database.');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Unexpected error: ' + err.message);
        }
    }

    // Call fetchItems after defining it
    fetchItems();
});
