// japanese translations
var translations = {};

// set to false for english only
var japaneseEnabled = true;

// symptoms
translations['Severe'] = '痛烈な痛み';
translations['Feels like "stabbing" or "drilling"'] = '刺すような痛み';
translations['Pulsing or throbbing'] = '脈打っている';
translations['Feels like pressure around my head'] = '頭が圧迫される感じ';

// questions
translations['What is the character of your headache?'] = 'どのような頭痛の種類ですか？';
translations['What is your body temperature?'] = '体温はどの程度ありますか？';
translations['Above 101 °F (38 °C)'] = '38°C以上';
translations['Between 99.5 and 101 °F (37 and 38 °C)'] = '37〜38°Cの間';
translations['Do you have a sore throat?'] = '喉の痛みはありますか？';
translations['Have you noticed white pus filled spots or layer on your tonsils or the back of your throat?'] = '喉の奥や扁桃腺のあたりに、白い斑点や膿がありますか？';
translations['Is your tongue red?'] = '舌の色は赤色ですか？';

// single answers
translations['Yes'] = 'はい';
translations['No'] = 'いいえ';
translations['Don\'t know'] = 'わからない';
translations['Submit'] = '提出する';

// result
translations['Acute tonsillitis'] = '急性扁桃炎';
translations['I suggest seeing your family doctor.'] = 'かかりつけのお医者さんに診てもらうことをお勧めします。';
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
