// japanese translations
var translations = {};

// set to false for english only
var japaneseEnabled = true;

// symptoms
translations['Severe'] = '深刻な';
translations['Feels like "stabbing" or "drilling"'] = '「刺す」または「穿孔する」のような感じがする';
translations['Pulsing or throbbing'] = '脈打つか鼓動する';
translations['Feels like pressure around my head'] = '私の頭の周りの圧力のような感じ';

// questions
translations['What is the character of your headache?'] = 'あなたの頭痛の特徴は何ですか？';
translations['What is your body temperature?'] = 'あなたの体温は？';
translations['Above 101 °F (38 °C)'] = '101°F（38°C）以上';
translations['Between 99.5 and 101 °F (37 and 38 °C)'] = '99.5〜101°F（37〜38°C）';
translations['Do you have a sore throat?'] = 'あなたは喉が痛いですか？';
translations['Have you noticed white pus filled spots or layer on your tonsils or the back of your throat?'] = 'あなたの扁桃や喉の裏に白い膿がいっぱいの斑点や層があることに気付きましたか？';
translations['Is your tongue red?'] = 'あなたの舌は赤ですか？';

// single answers
translations['Yes'] = 'はい';
translations['No'] = 'いいえ';
translations['Don\'t know'] = '知らない';
translations['Submit'] = '提出する';

// result
translations['Acute tonsillitis'] = '急性扁桃炎';
translations['I suggest seeing your family doctor.'] = '私はあなたの家庭医を見ることをお勧めします。';
translations['Mild'] = 'マイルド';
translations['Moderate'] = '中位';
translations['Severe'] = '深刻な';
translations['Common'] = '一般';
translations['Rare'] = '希少';
translations['Very Rare'] = '激レア';

// nav
translations['Home'] = 'ホーム';
translations['Doctors'] = '医師';

exports.translate = function(text){
	if(japaneseEnabled && (text in translations)) {
		return translations[text];
	}

	return text;
}