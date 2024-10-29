<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="product in products"
      :key="product.id"
      class="border rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105"
    >
      <img
        :src="product.image"
        alt="Product Image"
        class="w-full h-48 object-cover rounded"
      />
      <h3 class="text-lg font-semibold mt-2">{{ product.name }}</h3>
      <p class="text-gray-600">Ksh{{ product.price.toFixed(2) }}</p>
      <button
        @click="addToCart(product)"
        class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  onAddToCart: {
    type: Function,
    required: true,
  },
});

const addToCart = (product) => {
  props.onAddToCart(product);
};
</script>

