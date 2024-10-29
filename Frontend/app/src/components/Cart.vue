<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <ul class="space-y-4">
      <li
        v-for="item in cart"
        :key="item.id"
        class="flex items-center p-4 border rounded-lg shadow"
      >
        <img
          :src="item.image"
          alt="Product image"
          class="h-16 w-16 mr-4 object-cover"
        />
        <div class="flex-grow">
          <h3 class="text-xl font-semibold">{{ item.name }}</h3>
          <p>Quantity: {{ item.quantity }}</p>
          <p class="text-gray-500">${{ item.price.toFixed(2) }}</p>
        </div>
        <button
          @click="removeFromCart(item)"
          class="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </li>
    </ul>
    <div v-if="cart.length === 0" class="mt-4 text-gray-500">
      Your cart is empty.
    </div>
    <div class="mt-4 text-lg font-bold">Total: Ksh{{ total.toFixed(2) }}</div>

    <h3 class="text-xl font-semibold mt-4">Payment Method</h3>
    <select
      v-model="selectedPaymentMethod"
      class="mt-2 mb-4 p-2 border rounded"
    >
      <option value="cash">Cash</option>
      <option value="cashless">Cashless</option>
    </select>

    <button
      @click="checkout"
      :disabled="cart.length === 0 || isLoading"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {{ isLoading ? "Processing..." : "Checkout" }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import axios from "axios";

const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
  updateCart: {
    type: Function,
    required: true,
  },
});

const total = computed(() => {
  return props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// State for selected payment method and loading state
const selectedPaymentMethod = ref("cash");
const isLoading = ref(false);

// Remove item from cart
const removeFromCart = (item) => {
  props.updateCart(item, -1);
};

// Checkout
const checkout = async () => {
  const paymentMethod = selectedPaymentMethod.value;
  if (paymentMethod === "cashless") {
    const phoneNumber = prompt("Please enter your phone number:");
    // Add phone number validation here if needed
    if (!phoneNumber) {
      alert("Phone number is required for cashless payment.");
      return;
    }

    const amount = total.value;
    isLoading.value = true;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/pay",
        {
          phoneNumber,
          amount,
        }
      );
      alert(`Payment response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      alert(
        `Payment failed: ${error.response?.data?.message || "Unknown error"}`
      );
      console.error(error);
    } finally {
      isLoading.value = false; // Reset loading state
    }
  } else {
    alert(`Proceeding to checkout with cash payment...`);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
