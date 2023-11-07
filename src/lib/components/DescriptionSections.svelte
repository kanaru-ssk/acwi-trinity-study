<script lang="ts">
	import Gist from '$lib/components/Gist.svelte';
</script>

<article>
	<section>
		<h2>当サイトについて</h2>
		<p>MSCI ACWI を日本円建てで取崩しシミュレーションした日本版トリニティスタディです。</p>
		<p>毎月最新データを自動的に取得し、シミュレーション結果を更新しています。</p>
	</section>

	<section>
		<h2>トリニティスタディとは？</h2>
		<p>
			1998年、
			<a href="https://www.aaii.com/journal" target="_blank" rel="noopener noreferrer">
				THE AAII JOURNAL
			</a>
			に掲載された以下の論文の通称。
		</p>
		<p>
			<a
				href="https://www.aaii.com/files/pdf/6794_retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable.pdf"
				target="_blank"
				rel="noopener noreferrer"
			>
				Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable
			</a>
		</p>
		<p>
			現役時に貯めた資産を取り崩して生活する退職者を想定し、株式および債権で運用された資産の安全な取崩し率を調べた論文です。
		</p>
		<p>
			この論文では株式に
			S&P500(アメリカの株式インデックス)、債権にアメリカの長期高格付け社債を使用してシミュレーションしています。
		</p>
		<p>
			本サイトでは、日本人向けとして
			ACWI(全世界株式インデックス)を日本円建てで取崩すシミュレーションをしました。
		</p>
	</section>

	<section>
		<h2>シミュレーションアルゴリズム</h2>
		<p>
			このサイトで使用したプログラムは
			<a
				href="https://github.com/kanaru-ssk/trinity-study"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</a>
			で公開しています。ソースコード内の
			<a
				href="https://github.com/kanaru-ssk/trinity-study/blob/main/src/lib/server/makeSimulationData.ts"
				target="_blank"
				rel="noopener noreferrer"
			>
				makeSimulationData.ts
			</a>
			で実際に動いているシミュレーションアルゴリズムをご確認頂けます。
		</p>

		<h3>例:3%で15年間取崩す場合</h3>
		<p>取崩し額 = 初年度資産残高 * 0.03</p>
		<p />
		<dl>
			<dt>1年目</dt>
			<dd>資産残高 = 資産残高 - 取崩し額</dd>
		</dl>
		<dl>
			<dt>2年目</dt>
			<dd>騰落率 = 2年目の基準価格 / 1年目の基準価格</dd>
			<dd>資産残高 = 資産残高 * 騰落率 - 取崩し額</dd>
		</dl>
		<dl>
			<dt>3年目</dt>
			<dd>騰落率 = 3年目の基準価格 / 2年目の基準価格</dd>
			<dd>資産残高 = 資産残高 * 騰落率 - 取崩し額</dd>
		</dl>
		<p>...</p>
		<dl>
			<dt>15年目</dt>
			<dd>騰落率 = 15年目の基準価格 / 14年目の基準価格</dd>
			<dd>資産残高 = 資産残高 * 騰落率 - 取崩し額</dd>
		</dl>
		<p>15年間資産が0にならなければ成功。</p>
		<p>成功率 = 成功回数 / 試行回数</p>

		<h3>試行回数について</h3>
		<p>以下条件の場合の試行回数で説明します。</p>
		<ul>
			<li>15年間取崩す</li>
			<li>1987年12月 ~ 2023年10月までの431ヶ月分のデータが取得できている</li>
		</ul>
		<p>以下のように、取崩し月をひと月ずつずらしてシミュレーションをおこなっています。</p>
		<dl>
			<dt>1回目</dt>
			<dd>1987/12、1988/12、1989/12、... 2001/12</dd>
		</dl>
		<dl>
			<dt>2回目</dt>
			<dd>1988/01、1989/01、1990/01、... 2002/01</dd>
		</dl>
		<dl>
			<dt>3回目</dt>
			<dd>1988/02、1989/02、1990/02、... 2002/02</dd>
		</dl>
		<p>...</p>
		<dl>
			<dt>252回目</dt>
			<dd>2009/10、2010/10、2011/10、... 2023/10</dd>
		</dl>
		<p>252 = 1 + 431 - 12 * 15</p>
		<p>試行回数 = 1 + (データ月数) - 12 * (取崩し期間)</p>
		<p>取崩し期間が短いほど試行回数が多くなっています。</p>

		<h3>実際のソースコードを抜粋</h3>
		<div class="gistWrapper">
			<Gist gistUrl="https://gist.github.com/kanaru-ssk/b463bcd3463b697f4ddc4123f0fe73e0.js" />
		</div>
	</section>

	<section>
		<h2>データ入手元</h2>
		<p>
			ACWI のチャートデータ : <a
				href="https://www.msci.com/end-of-day-data-search"
				target="_blank"
				rel="noopener noreferrer">End of day index data search</a
			>
		</p>
		<p>
			ドル円為替データ : <a
				href="https://exchangeratesapi.io/"
				target="_blank"
				rel="noopener noreferrer">exchangerates API</a
			>
		</p>
	</section>
</article>

<style>
	section {
		margin: 48px 0;
	}

	.gistWrapper {
		height: 860px;
	}
</style>
