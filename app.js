// Initialize Supabase client
const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Define Alpine.js component
function itemTable() {
    return {
        items: [],         // Array to hold items from the database
        loading: true,     // Loading state
        error: '',         // Error message
        menuActive: false, // Menu toggle state

        async fetchItems() {
            this.loading = true;
            this.error = '';

            const { data, error } = await supabase
                .from('items')
                .select('*');

            if (error) {
                this.error = 'Error fetching items: ' + error.message;
            } else {
                this.items = data;
            }
            this.loading = false;
        },

        // Toggle menu visibility
        toggleMenu() {
            this.menuActive = !this.menuActive;
        },

        // Close menu when clicking outside
        closeMenuOnClickOutside(event) {
            const menu = document.getElementById('menu');
            const hamburger = document.getElementById('hamburger');
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                this.menuActive = false;
            }
        },

        // Alpine.js init hook to fetch data and add event listener when the component loads
        init() {
            this.fetchItems();
            document.addEventListener('click', this.closeMenuOnClickOutside.bind(this));
        }
    }
}
