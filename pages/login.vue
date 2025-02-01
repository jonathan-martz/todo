<template>
    <section class="page md:mx-auto max-w-6xl bg-green-300 px-3 py-3">
        <form @submit.prevent="login()">
            <section class="form-control">
                <label for="" class="label text-sm font-bold">User</label>
                <input type="text" v-model="item.email" class="input">
            </section>
            <section class="form-control">
                <label for="" class="label text-sm font-bold">Password</label>
                <input type="text" v-model="item.password" class="input">
            </section>
            <section class="form-actions flex justify-end mt-3">
                <button type="submit" class="btn btn-primary">
                    abschicken
                </button>
            </section>
        </form>
    </section>
</template>

<script lang="ts" setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PocketBase from 'pocketbase'
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

// Todo viewModel
let item = ref({
    password: '',
    passwordConfirm: '',
    email: '',
});

let pb: PocketBase = new PocketBase('https://admin.todos.martz.cloud');

let login = async () => {
    await pb.collection('users').authWithPassword(item.value.email, item.value.password);
}
</script>
