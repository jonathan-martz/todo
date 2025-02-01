<template>
    <section class="page md:mx-auto max-w-6xl bg-green-300 px-3 py-3">
        <form @submit.prevent="update()">
            <section class="form-control hidden">
                <label for="" class="label text-sm font-bold">User</label>
                <input type="text" v-model="item.user" class="input">
            </section>
            <section class="grid grid-cols-6 gap-3">
                <div class="col-span-3">
                    <section class="form-control">
                        <label for="" class="label text-sm font-bold">Name</label>
                        <input type="text" v-model="item.name" class="input">
                    </section>
                </div>
                <div class="col-span-3">
                    <section class="form-control">
                        <label for="" class="label text-sm font-bold">Prio</label>
                        <input type="number" v-model="item.prio" min="1" max="5" class="input">
                    </section>
                </div>
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
import { useRoute } from 'vue-router';

const route = useRoute();

// Todo viewModel
let item = ref({
    name: '',
    user: '',
    prio: 5,
    description: '',
});

let pb: PocketBase = new PocketBase('https://admin.todos.martz.cloud');

let update = async () => {
    pb.collection('todos').update(item.value.id, {
        name: item.value.name,
        user: item.value.user,
        prio: item.value.prio,
        description: item.value.description
    });
}

onMounted(async () => {
    item.value.user = pb.authStore.model?.id ?? '0'

    item.value = await pb.collection('todos').getOne(route.params.id);
});
</script>