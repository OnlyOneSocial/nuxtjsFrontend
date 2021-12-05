<template>
	<component
		v-bind="$attrs"
		:is="component"
		:disabled="disabled"
		:class="[
			'button',
			`button-${color}`,
      		`button-${width}`,
      		`button-${size}`,
		]"
		:type="type === 'submit' ? 'submit' : 'button'"
		v-on="$listeners"
	>
		<slot>
			<span>{{ label }}</span>
		</slot>
	</component>
</template>
<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api';
const typeToTagEnum = {
	button: 'button',
	submit: 'button',
	link: 'NuxtLink',
	external_link: 'a'
};

export default defineComponent({
	props: {
		label: {
			type: String as PropType<string>,
			default: '&nbsp;'
		},
		type: {
			type: String as PropType<'button' | 'submit' | 'link' | 'external_link'>,
			default: 'button'
		},
		color: {
			type: String as PropType<'primary' | 'danger'>,
			default: 'primary'
		},

		width: {
			type: String as PropType<'auto' | 'fluid'>,
			default: 'auto'
		},

		size: {
			type: String as PropType<'md' | 'lg'>,
			default: 'md'
		},

		disabled: {
			type: Boolean as PropType<boolean>,
			default: false
		},
	},
	setup(props) {
		const component = computed(() => (
			typeToTagEnum[props.type]
		));

		return {
			component
		};
	}
});
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
