<template>
    <section class="page">
        <header class="mx-auto max-w-6xl px-3 py-3 bg-red-400 flex justify-between">
            <section class="logo"><a href="/" class="text-white font-bold">Todos - Martz.cloud</a></section>
            <nav class="flex justify-end">
                <ul class="flex space-x-3">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/logout">Logout</a></li>
                    <li><a href="/user">User</a></li>
                </ul>
            </nav>
        </header>
        <main class="min-h-screen mx-auto max-w-6xl">
            <slot></slot>
        </main>
        <footer class="mx-auto max-w-6xl">Footer</footer>
    </section>
</template>


<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

useHead({
    title: 'Todos - Martz.cloud'
});
</script>