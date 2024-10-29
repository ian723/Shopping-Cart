<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-3xl font-bold">Shopping App</h1>
    </header>
    <main class="container mx-auto p-4">
      <ProductList :products="products" @add-to-cart="addToCart" />
      <Cart :cart="cart" :update-cart="updateCart" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductList from "./components/ProductList.vue";
import Cart from "./components/Cart.vue";

const products = ref([]);
const cart = ref([]);

// Function to fetch products from the backend
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to load products");
  }
};

// Function to update the cart
const updateCart = (item, quantity) => {
  const existingItem = cart.value.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += quantity;
    if (existingItem.quantity <= 0) {
      cart.value = cart.value.filter((i) => i.id !== item.id);
    }
  } else if (quantity > 0) {
    cart.value.push({ ...item, quantity });
  }
};

// Function to add items to the cart
const addToCart = (item) => {
  updateCart(item, 1);
};

// Fetch products when the component mounts
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
