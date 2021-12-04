<template>
  <div class="input-group">
    <label
      v-if="label"
      class="input-group__name"
    >
      {{ label }}
    </label>
    <span class="input-group__cnt">
      <Component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        v-bind="$attrs"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        class="input-group__input"
        v-on="$listeners"
      />
    </span>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="postcss">
.input-group {
	margin: 6px 0;
	&__cnt {
		position: relative;
		display: block;
	}
	&__name {
		display: block;
		margin-bottom: 4px;
		font-weight: 500;
		font-size: 1.4rem;
		line-height: 100%;
		color: var(--color-form-label);
	}
	&__input {
		display: inline-flex;
		align-items: center;
		width: 100%;
		min-height: 40px;
		background-clip: padding-box;
		padding: 8px 16px;
		font-weight: 400;
		font-size: 1.4rem;
		line-height: 100%;
		cursor: text;
		letter-spacing: 0.01em;
		border-radius: 4px;
		border: 1px solid transparent;
		background: var(--color-form-bg);
		color: var(--color-form-input);
		box-shadow: 0 0 0 0 transparent;
		transition: border-color var(--transition-base);
		&:focus {
			border-color: var(--primary);
			background: var(--color-form-bg-focus);
		}
		&:disabled {
			opacity: .3;
		}
	}
}

</style>
