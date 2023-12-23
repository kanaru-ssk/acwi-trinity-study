<script lang="ts">
  import {
    Gist,
    Heading2,
    Heading3,
    Link,
    Section,
    Paragraph,
  } from "$lib/components";
</script>

<article>
  <Section>
    <Heading2>当サイトについて</Heading2>
    <Paragraph
      >MSCI ACWI
      を日本円建てで取崩しシミュレーションした日本版トリニティスタディです。</Paragraph
    >
    <Paragraph
      >毎月最新データを自動的に取得し、シミュレーション結果を更新しています。</Paragraph
    >
  </Section>

  <Section>
    <Heading2>トリニティスタディとは？</Heading2>
    <Paragraph>
      1998年、
      <Link
        text="THE AAII JOURNAL"
        href="https://www.aaii.com/journal"
        target="_blank"
      />
      に掲載された以下の論文の通称。
    </Paragraph>
    <Paragraph>
      <Link
        text="Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable"
        href="https://www.aaii.com/files/pdf/6794_retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable.pdf"
        target="_blank"
      />
    </Paragraph>
    <Paragraph>
      現役時に貯めた資産を取り崩して生活する退職者を想定し、株式および債権で運用された資産の安全な取崩し率を調べた論文です。
    </Paragraph>
    <Paragraph>
      この論文では株式に
      S&P500(アメリカの株式インデックス)、債権にアメリカの長期高格付け社債を使用してシミュレーションしています。
    </Paragraph>
    <Paragraph>
      本サイトでは、日本人向けとして
      ACWI(全世界株式インデックス)を日本円建てで取崩すシミュレーションをしました。
    </Paragraph>
  </Section>

  <Section>
    <Heading2>シミュレーションアルゴリズム</Heading2>
    <Paragraph>
      このサイトで使用したプログラムは
      <Link
        text="GitHub"
        href="https://github.com/kanaru-ssk/trinity-study"
        target="_blank"
      />
      で公開しています。ソースコード内の
      <Link
        text="makeSimulationData.ts"
        href="https://github.com/kanaru-ssk/trinity-study/blob/main/src/lib/server/makeSimulationData.ts"
        target="_blank"
      />
      で実際に動いているシミュレーションアルゴリズムをご確認頂けます。
    </Paragraph>

    <Heading3>例:3%で15年間取崩す場合</Heading3>
    <Paragraph>取崩し額 = 初年度資産残高 * 0.03</Paragraph>
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
    <Paragraph>...</Paragraph>
    <dl>
      <dt>15年目</dt>
      <dd>騰落率 = 15年目の基準価格 / 14年目の基準価格</dd>
      <dd>資産残高 = 資産残高 * 騰落率 - 取崩し額</dd>
    </dl>
    <Paragraph>15年間資産が0にならなければ成功。</Paragraph>
    <Paragraph>成功率 = 成功回数 / 試行回数</Paragraph>

    <Heading3>試行回数について</Heading3>
    <Paragraph>以下条件の場合の試行回数で説明します。</Paragraph>
    <ul>
      <li>15年間取崩す</li>
      <li>1987年12月 ~ 2023年10月までの431ヶ月分のデータが取得できている</li>
    </ul>
    <Paragraph
      >以下のように、取崩し月をひと月ずつずらしてシミュレーションをおこなっています。</Paragraph
    >
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
    <Paragraph>...</Paragraph>
    <dl>
      <dt>252回目</dt>
      <dd>2009/10、2010/10、2011/10、... 2023/10</dd>
    </dl>
    <Paragraph>252 = 1 + 431 - 12 * 15</Paragraph>
    <Paragraph>試行回数 = 1 + (データ月数) - 12 * (取崩し期間)</Paragraph>
    <Paragraph>取崩し期間が短いほど試行回数が多くなっています。</Paragraph>

    <Heading3>実際のソースコードを抜粋</Heading3>
    <div class="h-[860px]">
      <Gist
        gistUrl="https://gist.github.com/kanaru-ssk/b463bcd3463b697f4ddc4123f0fe73e0.js"
      />
    </div>
  </Section>

  <Section>
    <Heading2>データ入手元</Heading2>
    <Paragraph>
      ACWI のチャートデータ : <Link
        text="End of day index data search"
        href="https://www.msci.com/end-of-day-data-search"
        target="_blank"
      />
    </Paragraph>
    <Paragraph>
      ドル円為替データ : <Link
        text="exchangerates API"
        href="https://exchangeratesapi.io/"
        target="_blank"
      />
    </Paragraph>
  </Section>
</article>
