<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="[
      'button',
      `button-${color}`,
      `button-${width}`,
      `button-${size}`,
    ]"
    v-on="$listeners"
  >
    <span>{{ label }}</span>
  </button>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: '&nbsp;'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    color: {
      type: String,
      default: 'primary',
      validator (color) {
        // The value must match one of these strings
        return ['primary', 'danger'].includes(color)
      }
    },
    width: {
      type: String,
      default: 'auto',
      validator (width) {
        // The value must match one of these strings
        return ['auto', 'fluid', 'long'].includes(width)
      }
    },
    size: {
      type: String,
      default: 'md',
      validator (size) {
        // The value must match one of these strings
        return ['md', 'sm', 'lg'].includes(size)
      }
    }
  }
}
</script>
<style lang="postcss">
.button {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	vertical-align: middle;
	touch-action: manipulation;
	cursor: pointer;
	white-space: nowrap;
	text-decoration: none;
	width: auto;
	padding-left: 24px;
	padding-right: 24px;
	border: 1px solid transparent;
	border-radius: 6px;
	font-weight: 500;
	overflow: hidden;
	color: #fff;
	background: var(--button-background);
	transition:
		color var(--transition-base),
		background-color var(--transition-base),
		border-color var(--transition-base);

	&:disabled {
		cursor: not-allowed;
		pointer-events: none;

		&:hover {
			cursor: not-allowed;
		}
	}
	& > span {
		display: block;
	}
	&-md {
		font-size: 1.4rem;
		height: 42px;
	}
	&-lg {
		font-size: 1.6rem;
		height: 48px;
	}
	&-auto {
		width: auto;
	}
	&-fluid {
		flex: auto;
		min-width: 0;
		max-width: 100%;
		width: 100%;
	}
	&-long {
		padding-right: 44px;
		padding-left: 44px;
	}
	&-primary {
		--button-background: var(--primary);

		&:hover {
			background-color: var(--primary-hover);
			border-color: var(--primary-hover);
		}
	}
	&-danger {
		--button-background: var(--danger);

		&:hover {
			background-color: var(--danger-hover);
			border-color: var(--danger-hover);
		}
  }
}
</style>
