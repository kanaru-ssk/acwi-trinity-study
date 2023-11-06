# Trinity Study

MSCI ACWI を日本円建てで取崩しシミュレーションした日本版トリニティスタディ。
毎月最新データを自動的に取得し、シミュレーション結果を更新します。

![png](./static/screenshot.png)

[シミュレーション結果はこちら](https://trinity-study.kanaru.jp)

## トリニティスタディとは？

1998 年、THE AAII JOURNAL に掲載された以下の論文の通称。

[Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable](https://www.aaii.com/files/pdf/6794_retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable.pdf)

退職後に株式/債権で運用された資産の取崩し

## シミュレーションアルゴリズム

### 3%で 15 年間取り崩す場合

```
取崩し額 = 初年度資産残高 * 0.03

1年目 : 資産残高 = 資産残高 - 取崩し額

2年目 : 騰落率 = 2年目の基準価格 / 1年目の基準価格
       資産残高 = 資産残高 * 騰落率 - 取崩し額

3年目 : 騰落率 = 3年目の基準価格 / 2年目の基準価格
       資産残高 = 資産残高 * 騰落率 - 取崩し額

4年目 : 騰落率 = 4年目の基準価格 / 3年目の基準価格
       資産残高 = 資産残高 * 騰落率 - 取崩し額
...

15年目 : 騰落率 = 15年目の基準価格 / 14年目の基準価格
       資産残高 = 資産残高 * 騰落率 - 取崩し額

15年間資産が0にならなければ成功。

成功率 = 成功回数 / 試行回数
```

### 試行回数について

以下条件の場合の試行回数で説明

- 15 年間取崩す
- 1987 年 12 月から 2023 年 10 月までの 431 ヶ月分のデータが取得できている

以下のように、取崩し月を一月ずつずらしてシミュレーションしていく。

```
1回目 : 1987/12、1988/12、1989/12、... 2001/12
2回目 : 1988/01、1989/01、1990/01、... 2002/01
3回目 : 1988/02、1989/02、1990/02、... 2002/02
...
n回目 : 2009/10、2010/10、2011/10、... 2023/10

n = 1 + 431 - 12 * 15

試行回数 = 1 + (データ月数) - 12 * (取崩し期間)
```

なので、取崩し期間が短いほど試行回数が多くなっています。

### 実際のソースコード

[makeSimulationData.ts](./src/lib/server/makeSimulationData.ts)に記載されています。

```javascript
const simulate = (
	acwiData, // ACWIチャートデータ
	payoutPeriod, // 取崩し期間
	withdrawalRate, // 取崩し率
	numOfSimulation // 試行回数
) => {
	let countFailure = 0; // 失敗回数
	for (let i = 0; i < numOfSimulation; i++) {
		let amountRemaining = acwiData[i].price_jpy; // 資産残高

		// 毎年の取崩し額: 初年度の資産額に取崩し率をかけた額
		const withdrawals = amountRemaining * withdrawalRate * 0.01;
		for (let pi = 0; pi < payoutPeriod; pi++) {
			if (pi !== 0) {
				const prePrice = acwiData[i + 12 * (pi - 1)].price_jpy; // 1年前の基準価格
				const price = acwiData[i + 12 * pi].price_jpy; // 当月の基準価格
				const PercentageChange = price / prePrice; // 騰落率

				// 資産残高に騰落率を掛ける
				amountRemaining *= PercentageChange;
			}

			// 資産残高から取崩し額を引く
			amountRemaining -= withdrawals;

			// 資産残高が0になったら失敗
			if (amountRemaining <= 0) {
				countFailure++;
				break;
			}
		}
	}

	// 成功率 = (試行回数 - 失敗回数) / 試行回数
	return (numOfSimulation - countFailure) / numOfSimulation;
};
```

## データ入手元

ACWI のチャートデータ : [End of day index data search](https://www.msci.com/end-of-day-data-search)

ドル円為替データ : [exchangerates API](https://exchangeratesapi.io/)
