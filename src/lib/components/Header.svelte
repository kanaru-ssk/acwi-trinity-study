<header>
	<img src="/logo.svg" alt="logo" />
</header>

<style>
	header {
		position: sticky;
		top: 0;
		padding: 12px 16px;
		z-index: 100;
		backdrop-filter: blur(8px);
	}

	img {
		height: 32px;
	}

	@media (min-width: 640px) {
		header {
			padding: 24px 48px;
		}

		img {
			height: 48px;
		}
	}
</style>
