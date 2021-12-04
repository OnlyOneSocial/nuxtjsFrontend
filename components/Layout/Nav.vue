<template>
  <aside class="nav">
    <nav class="nav-list">
      <template v-if="me.id">
        <NuxtLink :to="`/user/${me.id}`" class="nav-list__item">
          <img src="/img/menu/my_page.svg">
          {{ $t('MyPage') }}
        </NuxtLink>
        <NuxtLink :to="`/user/${me.id}/friends`" class="nav-list__item">
          <img src="/img/menu/contacts.svg">
          {{ $t('Contacts') }}
        </NuxtLink>
        <NuxtLink to="/news" class="nav-list__item">
          <img src="/img/menu/news.svg">
          {{ $t('Feed') }}
        </NuxtLink>
        <NuxtLink to="/im" class="nav-list__item">
          <img src="/img/menu/news.svg">
          {{ $t('Dialogues') }}
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/users" class="nav-list__item">
          <img src="/img/menu/people.svg">
          {{ $t('UsersCatalog') }}
        </NuxtLink>
        <NuxtLink to="/about" class="nav-list__item">
          <img src="/img/menu/about.svg">
          {{ $t('AboutProject') }}
        </NuxtLink>
        <div v-if="$i18n.localeProperties.code=='ru'">
          <span @click="$i18n.setLocale('en')">
            Change to English
          </span>
        </div>
        <div v-else-if="$i18n.localeProperties.code=='en'" class="nav-list__item">
          <span @click="$i18n.setLocale('ru')">
            Сменить на Русский
          </span>
        </div>
      </template>
    </nav>
  </aside>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      me: state => state.me
    })
  }
}
</script>

<style lang="postcss" scoped>
.nav {
	flex: none;
	width: 320px;
	margin-right: 40px;
	padding: 1.5em 16px 32px;
	height: calc(100% - 1.5em);
	background-color: #fff;

	&-list {
		&__item {
			margin: 12px 0;
			text-decoration: none;
			display: flex;
			font-size: 1.6rem;
			align-items: center;
			color: var(--color-text);
			transition: color var(--transition-base);

			&:hover {
				color: var(--primary);
			}

			& img {
				flex: none;
				margin-right: 6px;
			}
		}
	}
}
</style>
