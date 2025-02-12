<template>
    {{ open }}
    <button @click="open = !open">Test 123</button>
    <dialog id="my_modal_1" class="modal" :class="{ 'modal-open': open }">
        <div class="modal-box">
            <form @submit.prevent="login()">
                <section class="form-control">
                    <label for="" class="label text-sm font-bold">Email</label>
                    <input type="text" v-model="item.email" class="input">
                </section>
                <section class="form-control">
                    <label for="" class="label text-sm font-bold">Password</label>
                    <input type="password" v-model="item.password" class="input">
                </section>
                <section class="form-actions flex justify-end mt-3">
                    <button type="submit" class="btn btn-primary">
                        abschicken
                    </button>
                </section>
            </form>
            <form method="dialog" class="modal-backdrop flex">
                <button class="btn btn-neutral btn-sm">close</button>
            </form>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PocketBase from 'pocketbase'
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();

let open = useLocalStorage('open', false, {});

// Todo viewModel
let item = ref({
    password: '',
    passwordConfirm: '',
    email: '',
});

let pb: PocketBase = new PocketBase('https://admin.martz.cloud');

let login = async () => {
    await pb.collection('users').authWithPassword(item.value.email, item.value.password);
    router.push('/');
}
</script>
