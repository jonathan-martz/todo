<template>
    <section class="page md:mx-auto max-w-6xl bg-green-300 px-3 py-3">
        <form @submit.prevent="add()">
            <section class="form-control hidden">
                <label for="" class="label text-sm font-bold">User</label>
                <input type="text" v-model="item.user" class="input">
            </section>
            <section class="form-control">
                <label for="" class="label text-sm font-bold">Kategorie</label>
                <select name="" id="" v-model="item.category" class="select">
                    <option v-for="category in categories" :key="category.id" :value="category.slug">
                        {{ category.name }}
                    </option>
                </select>
            </section>
            <section class="form-control">
                <label for="" class="label text-sm font-bold">Name</label>
                <input type="text" v-model="item.name" class="input">
            </section>
            <section class="form-control">
                <label for="" class="label text-sm font-bold">Prio</label>
                <select name="" id="" v-model="item.prio" class="select">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </section>
            <section class="form-control">
                <label for="" class="label text-sm font-bold">Beschreibung</label>
                <textarea name="" v-model="item.description" id="" rows="3" class="textarea"></textarea>
            </section>
            <section class="form-actions flex justify-end mt-3">
                <button type="submit" class="btn btn-primary">
                    abschicken
                </button>
            </section>
        </form>
    </section>
</template>

<script setup lang="ts">
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PocketBase from 'pocketbase'
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { useRouter, useRoute } from 'vue-router';

// Todo viewModel
let item = ref({
    name: '',
    user: '',
    prio: 3,
    description: '',
    category: '',
});

const categories = ref([]);

const router = useRouter();
const route = useRoute();

let pb: PocketBase = new PocketBase('https://admin.todos.martz.cloud');

let add = async () => {
    await pb.collection('todos').create({
        name: item.value.name,
        user: item.value.user,
        prio: item.value.prio,
        description: item.value.description,
        category: item.value.category
    });
    router.push('/');
}

onMounted(async () => {
    item.value.user = pb.authStore.model?.id ?? '0'
    categories.value = await pb.collection('todos_categories').getFullList(100);

    if (route.query.category) {
        console.log(route.query);
        item.value.category = route.query.category;
    }
});
</script>