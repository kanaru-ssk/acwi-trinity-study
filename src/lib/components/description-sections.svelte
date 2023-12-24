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
    <Paragraph>
      MSCI
      ACWIを日本円建てで取崩しシミュレーションした日本版トリニティスタディです。
    </Paragraph>
    <Paragraph>
      毎月最新データを自動的に取得し、シミュレーション結果を更新しています。
    </Paragraph>
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
        href="https://github.com/kanaru-ssk/trinity-study/blob/main/src/lib/server/make-simulation.ts"
        target="_blank"
      />
      で実際に動いているシミュレーションアルゴリズムをご確認頂けます。
    </Paragraph>
    <Paragraph>
      上記ファイルの関数で以下の手順でシミュレーションしています。
    </Paragraph>
    <ol class="list-decimal space-y-2 pl-8">
      <li>
        初年度の資産額を100に設定。毎年の取り崩し額は取り崩し率の数値（5%取り崩しの場合5）となる。
      </li>
      <li>初年度はそのまま取り崩し(100 – 5で資産残高95)</li>
      <li>
        2年目以降は資産残高に騰落率をかけて時価を計算し、そこから取り崩す。（10%値上がりした場合、95*1.1–5=99.5）
      </li>
      <li>3を取り崩し年数分繰り返し、資産残高が0にならなければ成功とする。</li>
    </ol>
    <Heading3>試行回数について</Heading3>
    <Paragraph>上の操作をデータ数が許す限り繰り返す。</Paragraph>
    <Paragraph>
      例えば、1987年12月から2023年11月のデータを取得出来ている場合、15年の取り崩し年数でシミュレーションする回数は以下のようになる。
    </Paragraph>
    <ul class="list-disc space-y-2 pl-8">
      <li>1回目、1987年12月から2001年12月。</li>
      <li>2回目、1988年1月から2002年1月。</li>
      <li>3回目、1988年2月から2002年2月。</li>
      <li>...</li>
      <li>263回目、2009年10月から2023年10月。</li>
      <li>264回目、2009年11月から2023年11月。</li>
    </ul>
    <Paragraph>
      計算式にすると、
      <code class="rounded-sm bg-neutral-200 px-2 py-1 text-xs">
        (データ月数) - 12 * (取り崩し年数 - 1)
      </code>
      となる。
    </Paragraph>
    <Heading3>実際のソースコードを抜粋</Heading3>
    <div class="h-[840px]">
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
