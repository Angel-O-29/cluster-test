<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MailIcon, KeySquareIcon } from 'lucide-vue-next'

const refReset: any = ref(null)
const isPwd = ref(true)
const store = useAuthStore()
const route = useRoute()

const auth = reactive<{
  password: string
  confirmPassword: string
}>({
  password: '',
  confirmPassword: '',
})

const loading = computed(() => store.loading)
const isEmpty = computed(
  () => auth.password == '' || auth.confirmPassword == '',
)
const isDiferent = computed(() => auth.password != auth.confirmPassword)

async function reset() {
  try {
    const validateReset = await refReset.value.validate()
    if (!validateReset) return

    if (route?.params) {
      const formData = {
        password: auth.password,
        passwordConfirmation: auth.confirmPassword,
        userId: route.params.id,
        token: route.params.token,
      }
      store.changedPasswordRequest(formData)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="sign-bg tw-min-h-screen tw-bg-secondary tw-text-gray-900 tw-flex tw-justify-center"
  >
    <AppbarSign />
    <div
      class="tw-max-w-screen-xl tw-m-0 sm:tw-m-10 sm:tw-rounded-lg tw-flex tw-justify-center tw-flex-1"
    >
      <div class="lg:tw-w-1/2 xl:tw-w-5/12 tw-p-6 sm:tw-p-12">
        <div class="tw-mt-12 tw-flex tw-flex-col tw-items-center">
          <div class="tw-mb-8">
            <img src="@/assets/svg/logo-green-text.svg" alt="" />
          </div>
          <h1
            class="tw-text-[35px] xl:tw-text-[50px] tw-font-extralight tw-text-white tw-mb-4"
          >
            {{ $t('auth.reset.title') }}
          </h1>
          <div class="tw-w-full tw-flex-1">
            <div class="">
              <q-form @submit.prevent.stop="reset" ref="refReset">
                <InputCPA
                  filled
                  dark
                  class="tw-mb-2"
                  v-model="auth.password"
                  :label="$t('auth.login.inputs.password')"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Password is required',
                    (val) =>
                      val.length >= 8 ||
                      'Password must be at least 8 characters long',
                    (val) =>
                      /[A-Z]/.test(val) ||
                      'Must contain at least one uppercase letter',
                    (val) =>
                      /[a-z]/.test(val) ||
                      'Must contain at least one lowercase letter',
                    (val) =>
                      /\d/.test(val) || 'Must contain at least one number',
                    (val) =>
                      /[\W_]/.test(val) ||
                      'Must contain at least one special character',
                  ]"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:prepend>
                    <KeySquareIcon class="!tw-text-primary" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </InputCPA>
                <InputCPA
                  filled
                  dark
                  class="tw-mb-2"
                  v-model="auth.confirmPassword"
                  :label="$t('auth.reset.confirmPassword')"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Password is required',
                    (val) =>
                      val.length >= 8 ||
                      'Password must be at least 8 characters long',
                    (val) =>
                      /[A-Z]/.test(val) ||
                      'Must contain at least one uppercase letter',
                    (val) =>
                      /[a-z]/.test(val) ||
                      'Must contain at least one lowercase letter',
                    (val) =>
                      /\d/.test(val) || 'Must contain at least one number',
                    (val) =>
                      /[\W_]/.test(val) ||
                      'Must contain at least one special character',
                    (val) => val == auth.password || 'Password does not match',
                  ]"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:prepend>
                    <KeySquareIcon class="!tw-text-primary" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </InputCPA>
                <transition name="hero">
                  <Button
                    :disabled="isEmpty || isDiferent"
                    type="submit"
                    class="hero tw-mt-5 tw-tracking-wide tw-font-semibold tw-bg-indigo-500 tw-text-gray-100 tw-w-full tw-py-4 tw-rounded-lg tw-hover:bg-indigo-700 tw-transition-all tw-duration-300 tw-ease-in-out tw-flex tw-items-center tw-justify-center"
                  >
                    <span class="tw-ml-3">
                      {{ $t('auth.reset.submitBtn') }}
                    </span>
                  </Button>
                </transition>
              </q-form>
              <p
                class="tw-mt-8 tw-text-sm tw-font-extralight tw-text-white tw-text-center"
              >
                {{ $t('auth.register.existAccount.content') }}
                <NuxtLink to="/auth/login" class="tw-text-primary tw-ml-1">
                  {{ $t('auth.register.existAccount.link') }}
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  view-transition-name: article-thumb;
}
</style>
