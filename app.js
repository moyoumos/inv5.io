const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function tableApp() {
    return {
        items: [],           // Array to hold items from the database
        menuOpen: false,     // Boolean to track menu state

        // Function to toggle menu visibility
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },

        // Function to fetch items from Supabase
        async fetchItems() {
            const { data, error } = await supabase.from('items').select('*');
            if (error) {
                console.error('Error fetching items:', error);
                return;
            }
            this.items = data; // Set the items array to the fetched data
        },

        // Lifecycle method called when the component is initialized
        init() {
            this.fetchItems(); // Fetch items when the app initializes
        }
    };
}
