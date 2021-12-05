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
		<span
			v-if="label"
			class="caption-count"
		>
			{{ label }}
			<b>
				<slot name="info">
					{{ count }}
				</slot>
			</b>
		</span>
	</header>
</template>
<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api';

export default defineComponent({
	components: {},
	props: {
		tag: {
			type: String as PropType<string>,
			default: 'h3'
		},
		title: {
			type: String as PropType<string>
		},
		label: {
			type: String as PropType<string>
		},
		count: {
			type: Number as PropType<number>
		},
		size: {
			type: String as PropType<'tn' | 'sm' | 'md'| 'lg' | 'hg'>,
			default: 'md'
		},
		position: {
			type: String as PropType<'' | 'caption--left' | 'caption--center' | 'caption--right'>,
			default: ''
		}
	} as const,
	setup() {
		return {};
	}
});
</script>
<style lang="postcss">
.caption {
	white-space: nowrap;
	width: 100%;

	@media screen and (min-width: 360px) {
		display: flex;
		align-items: baseline;
	}

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
		font-weight: 500;
		line-height: 133%;
		transition: color var(--transition-base);
		white-space: initial;
		flex: none;
		margin-top: 0;
		margin-bottom: 0;

		&--md {
			font-size: 2.1rem;
			@media screen and (min-width: 1024px) {
				font-size: 2.4rem;
			}
		}

		&--sm {
			font-size: 1.6rem;
			@media screen and (min-width: 360px) {
				font-size: 1.8rem;
			}

			& + .caption-count {
				font-size: 1.4rem;

				@media screen and (min-width: 360px) {
					margin-left: 8px;
				}
			}
		}

		&--lg {
			font-size: 2.1rem;
			@media screen and (min-width: 640px) {
				font-size: 2.4rem;
			}
			@media screen and (min-width: 1024px) {
				font-size: 3.2rem;
			}
		}

		&--hg {
			font-size: 2.1rem;
			@media screen and (min-width: 640px) {
				font-size: 2.8rem;
			}
			@media screen and (min-width: 1024px) {
				font-size: 3.6rem;
			}
		}

		&--tn {
			font-size: 1.2rem;
			letter-spacing: 0.48px;
			text-transform: uppercase;
		}
		&--default {
			color: var(--color-text-head);
		}
	}

	&-count {
		@media screen and (min-width: 360px) {
			margin-left: 12px;
		}

		b {
			font-weight: 500;
		}
	}

}
</style>
