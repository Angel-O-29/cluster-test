<script setup lang="ts">
import {
  FactoryIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SquarePenIcon,
  GlobeIcon,
} from 'lucide-vue-next'
import StarSVG from '@/assets/svg/star.svg'
import FacebookSVG from '@/assets/svg/brand-facebook-white.svg'
import ShareSVG from '~/assets/svg/share.svg'
import ProfileEdit from '~/components/modals/ProfileEdit.vue'
import ProfileChangeProfileImage from '~/components/modals/ProfileChangeProfileImage.vue'
import type { ExperienceUserInformation } from '~/models/interfaces/user'
definePageMeta({
  middleware: 'auth',
})

const auth = useAuthStore()

const user = computed(() => auth.user)
const extraFields = computed(() => auth.fullUser?.extraFields)
const description = computed(() => auth.userDescription)
const socialMedia = computed(() => auth.userSocialMedia)
const experiences = computed(
  () =>
    <ExperienceUserInformation[]>(
      auth.user?.information?.filter((item) => item.type === 'experience')
    ) ?? [],
)

const show_modal_editSkills = ref(false)
const show_modal_editPhoto = ref(false)
const show_modal_addExperience = ref(false)
onMounted(() => {
  auth.requestFullUser()
})
</script>

<template>
  <div class="tw-mt-20">
    <div class="tw-bg-gray-100 tw-h-64 img-profile"></div>
    <div class="tw-container">
      <div class="tw-flex tw-mt-5">
        <div class="tw-basis-64 tw-relative">
          <div class="img-container">
            <client-only>
              <div
                class="tw-h-full tw-w-full tw-bg-white tw-rounded-md"
                :style="{
                  backgroundImage: `url(${user?.mediaFiles.profile.path ?? user?.mediumImage})`,
                }"
              ></div>
            </client-only>
            <Button
              @click="show_modal_editPhoto = true"
              type="button"
              variant="outline"
              class="tw-border-none profile-btn !tw-p-3"
            >
              <SquarePenIcon :size="20" />
            </Button>
          </div>
        </div>
        <div class="tw-grow tw-border-b tw-border-[hsla(0, 0%, 90%, 1)]">
          <h2
            class="tw-mb-0 tw-w-max tw-px-4 tw-py-3 tw-border-b-4 tw-text-xl tw-font-normal profile-title"
          >
            Perfil del usuario
          </h2>
        </div>
      </div>
      <div class="tw-mt-10 tw-flex tw-items-center tw-gap-4">
        <h3 class="tw-font-bold tw-text-4xl">
          {{ user?.firstName }} {{ user?.lastName }}
        </h3>
        <p class="tw-text-muted-custom tw-text-3xl tw-font-light">
          {{ user?.email }}
        </p>
        <div class="tw-grow"></div>
        <Button
          type="button"
          variant="outline"
          @click="auth.logout"
          class="tw-border-none profile-btn"
        >
          Log Out
        </Button>
        <Button
          type="button"
          variant="outline"
          class="tw-border-none profile-btn"
        >
          <ShareSVG filled class="tw-text-xl" />
        </Button>
        <Button
          @click="show_modal_editSkills = true"
          type="button"
          variant="outline"
          class="tw-border-none profile-btn"
        >
          <SquarePenIcon :size="15" class="tw-mr-2" />
          Editar
        </Button>
      </div>
      <div class="tw-flex tw-gap-8 tw-mt-10">
        <div class="tw-basis-full lg:tw-flex-1 tw-overflow-hidden tw-pr-4">
          <h4 class="tw-text-xl tw-text-muted-custom tw-mb-5">Descripción</h4>
          <p class="tw-text-xl">
            {{ description }}
          </p>
<!--           
          <div class="tw-flex tw-justify-between tw-mt-32 tw-mb-10">
            <h4 class="tw-font-bold tw-text-4xl">Portafolio</h4>

            <Button
              type="button"
              variant="outline"
              class="tw-border-none profile-btn"
            >
              <SquarePenIcon :size="15" class="tw-mr-2" />
              Administrar portafolio
            </Button>
          </div>
          <div class="portfolio-slider tw-mb-20">
            <CardPortfolio id="1"></CardPortfolio>
            <CardPortfolio id="2"></CardPortfolio>
            <CardPortfolio id="2"></CardPortfolio>
            <CardPortfolio id="2"></CardPortfolio>
            <CardPortfolio id="2"></CardPortfolio>
            <CardPortfolio id="2"></CardPortfolio>
          </div> -->

          <h4 class="tw-text-xl tw-text-black tw-font-bold tw-mb-10">
            <StarSVG class="tw-inline-block tw-text-black tw-mr-5" />
            0.0 - 0 Reviews
          </h4>
          <div>
            <Card
              class="tw-max-w-72 tw-py-3 tw-px-6 tw-mb-2 xl:tw-translate-x-1/2"
            >
              <RatingIndicator starClass="tw-text-lg tw-mr-1" :rating="5" />
              <div class="tw-mt-2 tw-flex tw-gap-3">
                <div class="tw-bg-muted-light tw-h-10 tw-w-10 tw-rounded"></div>
                <div class="tw-flex-grow">
                  <div
                    class="tw-bg-muted-light tw-w-full tw-h-2 tw-rounded-md tw-mb-3"
                  ></div>
                  <div
                    class="tw-bg-muted-light tw-w-1/2 tw-h-2 tw-rounded-md"
                  ></div>
                </div>
              </div>
            </Card>
            <Card
              class="tw-max-w-72 tw-py-3 tw-px-6 tw-mb-2 xl:tw-transform translate-x-custom"
            >
              <RatingIndicator starClass="tw-text-lg tw-mr-1" :rating="5" />
              <div class="tw-mt-2 tw-flex tw-gap-3">
                <div class="tw-bg-muted-light tw-h-10 tw-w-10 tw-rounded"></div>
                <div class="tw-flex-grow">
                  <div
                    class="tw-bg-muted-light tw-w-full tw-h-2 tw-rounded-md tw-mb-3"
                  ></div>
                  <div
                    class="tw-bg-muted-light tw-w-1/2 tw-h-2 tw-rounded-md"
                  ></div>
                </div>
              </div>
            </Card>
            <Card class="tw-max-w-72 tw-py-3 tw-px-6 tw-mb-2">
              <RatingIndicator starClass="tw-text-lg tw-mr-1" :rating="5" />
              <div class="tw-mt-2 tw-flex tw-gap-3">
                <div class="tw-bg-muted-light tw-h-10 tw-w-10 tw-rounded"></div>
                <div class="tw-flex-grow">
                  <div
                    class="tw-bg-muted-light tw-w-full tw-h-2 tw-rounded-md tw-mb-3"
                  ></div>
                  <div
                    class="tw-bg-muted-light tw-w-1/2 tw-h-2 tw-rounded-md"
                  ></div>
                </div>
              </div>
            </Card>
          </div>
          <div class="lg:tw-w-1/2">
            <p
              class="tw-text-xl tw-text-muted-custom tw-font-light tw-my-10 tw-text-center"
            >
              Sin reviews
            </p>
          </div>

          <div class="tw-flex tw-mt-32 tw-mb-10">
            <h4 class="tw-font-bold tw-text-4xl">Experiencia</h4>
            <div class="tw-grow"></div>

            <Button
              @click="show_modal_addExperience = true"
              type="button"
              variant="outline"
              class="tw-border-none profile-btn"
            >
              <SquarePenIcon :size="15" class="tw-mr-2" />
              Agregar experiencia
            </Button>
          </div>
          <div>
            <CardExperience
              v-for="experience in experiences"
              class="tw-mb-3"
              :key="`experience_user${experience.id}`"
              :img="experience.mediaFiles?.mainimage?.path"
              :id="experience.id"
              :init="Helper.parseStringToDate(experience.options.dateInit)"
              :end="
                experience.options.dateEnd
                  ? Helper.parseStringToDate(experience.options.dateEnd)
                  : undefined
              "
              :place="experience.options.place"
            >
              <template v-slot:skill>{{ experience.options.skill }}</template>
              <template v-slot:title>{{ experience.title }}</template>
              <template v-slot:description>
                {{ experience.description }}
              </template>
            </CardExperience>
          </div>
        </div>

        <!-- aside -->
        <aside class="tw-basis-full lg:tw-flex-none tw-w-80 tw-pb-20">
          <Card class="tw-py-3 tw-px-6 tw-sticky tw-top-28 tw-bottom-20">
            <CardHeader
              class="tw-h-full tw-justify-center tw-border-b-2 tw-border-muted-light !tw-p-2 !tw-pb-4 !tw-rounded-4xl"
            >
              <CardTitle
                class="!tw-leading-normal tw-font-normal tw-text-base tw-text-muted-custom"
              >
                Datos de contacto
              </CardTitle>
            </CardHeader>
            <CardContent
              class="!tw-py-5 !tw-px-0 tw-border-b-2 tw-border-muted-light"
            >
              <div class="tw-flex tw-items-center tw-mb-4">
                <div
                  class="tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"
                >
                  <FactoryIcon class="tw-text-black" :size="20" />
                </div>
                <div class="tw-text-black tw-ml-3">
                  <p class="tw-mb-1 tw-text-sm tw-font-bold">
                    Nombre de la empresa
                  </p>
                  <p class="tw-mb-0 tw-text-xs">
                    {{ extraFields?.companyName?.value }}
                  </p>
                </div>
              </div>
              <div class="tw-flex tw-items-center tw-mb-4">
                <div
                  class="tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"
                >
                  <PhoneIcon class="tw-text-black" :size="20" />
                </div>
                <div class="tw-text-black tw-ml-3">
                  <p class="tw-mb-1 tw-text-sm tw-font-bold">Teléfono</p>
                  <p class="tw-mb-0 tw-text-xs">
                    {{ extraFields?.phone?.value }}
                  </p>
                </div>
              </div>
              <div class="tw-flex tw-items-center tw-mb-4">
                <div
                  class="tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"
                >
                  <MailIcon class="tw-text-black" :size="20" />
                </div>
                <div class="tw-text-black tw-ml-3">
                  <p class="tw-mb-1 tw-text-sm tw-font-bold">Email</p>
                  <p class="tw-mb-0 tw-text-xs">{{ user?.email }}</p>
                </div>
              </div>
              <div class="tw-flex tw-items-center tw-mb-4">
                <div
                  class="tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"
                >
                  <MapPinIcon class="tw-text-black" :size="20" />
                </div>
                <div class="tw-text-black tw-ml-3">
                  <p class="tw-mb-1 tw-text-sm tw-font-bold">Location</p>
                  <p class="tw-mb-0 tw-text-xs">
                    {{ extraFields?.place?.value }}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter
              class="tw-flex tw-gap-4 tw-justify-center !tw-p-0 !tw-pt-3"
            >
              <a
                v-if="socialMedia.facebook"
                :href="socialMedia.facebook"
                class="social-icon facebook"
              >
                <FacebookSVG class="tw-text-white tw-text-3xl" />
              </a>
              <a
                v-if="socialMedia.twitter"
                :href="socialMedia.twitter"
                class="social-icon"
              >
                T
              </a>
              <a
                v-if="socialMedia.linkedin"
                :href="socialMedia.linkedin"
                class="social-icon"
              >
                L
              </a>
              <a
                v-if="socialMedia.web"
                :href="socialMedia.web"
                class="social-icon !tw-bg-primary"
              >
                <GlobeIcon :size="30" class="" />
              </a>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  </div>
  <ProfileEdit v-model="show_modal_editSkills" />
  <ProfileChangeProfileImage v-model="show_modal_editPhoto" />
  <ModalsAddExperience v-model="show_modal_addExperience" />
</template>

<style lang="css" scoped>
.img-profile {
  background-size: 100% auto;
  background-image: url('@/assets/images/bg-profile.png');
}

.img-container {
  @apply tw-rounded-md tw-absolute tw-bottom-0 tw-h-60 tw-w-60 tw-p-2;
  box-shadow: 0px 0px 20px 0px hsla(0, 0%, 0%, 0.15);
  & > button {
    background-color: white;
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
  & > div {
    background-size: 100% 100%;
    background-image: url('@/assets/images/login-bg.png');
  }
}
.profile-title {
  @apply tw-text-muted-custom tw-border-muted-custom;
}
.profile-btn {
  @apply tw-border-none tw-p-3;
  box-shadow: 0px 0px 20px 0px hsla(0, 0%, 0%, 0.15);
  @apply tw-text-muted-custom;
}
.social-icon {
  @apply tw-rounded-full tw-p-1 tw-h-10 tw-w-10 tw-grid tw-place-items-center tw-bg-secondary;
  &.facebook {
    background-color: hsla(216, 96%, 47%, 1);
  }
}
.portfolio-slider {
  @apply tw-flex tw-gap-4 tw-flex-nowrap tw-overflow-x-scroll;
  & > * {
    flex: 0 0;
    @apply tw-basis-96;
  }
}
.translate-x-custom {
  --tw-translate-x: 90%;
}
</style>
