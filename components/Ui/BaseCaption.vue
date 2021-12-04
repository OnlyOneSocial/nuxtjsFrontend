<template>
  <header
    :class="[
      'caption',
      `${position}`
    ]"
  >
    <Component
      :is="tag"
      :class="[
        'caption-title',
        `caption-title--${size}`
      ]"
    >
      {{ title }}
    </Component>
  </header>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'h3'
    },
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator (prop) {
        // The value must match one of these strings
        return ['tn', 'sm', 'md', 'lg', 'hg'].includes(prop)
      }
    },
    position: {
      type: String,
      default: '',
      validator (prop) {
        // The value must match one of these strings
        return ['caption--left', 'caption--center', 'caption--right', ''].includes(prop)
      }
    }
  }
}
</script>
<style lang="postcss">
.caption {
	white-space: nowrap;
	width: 100%;

	&--left {
		justify-content: flex-start;
	}

	&--center {
		justify-content: center;
	}

	&--right {
		justify-content: flex-end;
	}

	&-title {
		font-weight: 600;
		line-height: 133%;
		transition: color var(--transition-base);
		white-space: initial;
		flex: none;
		margin-top: 0;
		margin-bottom: 0;
		color: var(--color-text-head);

		&--md {
			font-size: 2.1rem;
			@media screen and (min-width: 1024px) {
				font-size: 2.4rem;
			}
		}
		&--lg {
			font-size: 2.4rem;

			@media screen and (min-width: 1024px) {
				font-size: 3.2rem;
			}
		}
	}
}
</style>
