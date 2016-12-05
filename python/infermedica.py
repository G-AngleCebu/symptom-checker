import infermedica_api
import random

api = infermedica_api.API(app_id='387887c7', app_key='170ff97b4fada9443874b2558113b559')

request = infermedica_api.Diagnosis(sex='female', age=70)
request.add_symptom('s_21', 'present')
# request.add_symptom('s_98', 'present')
request.add_symptom('s_107', 'absent')
request = api.diagnosis(request)

# print(request)

doneDiagnosing = False

while(request.question and doneDiagnosing == False):
	print("---")
	print(request.question.text + " (" + request.question.type + ")")

	donePresent = False

	for i, item in enumerate(request.question.items):
		if request.question.type == "group_single" and donePresent == False:
			choiceIndex = 0
			donePresent = True
		else:
			choiceIndex = random.randrange(0,len(item["choices"]))

		print("- " + item["name"] + " --> " + item["choices"][choiceIndex]["label"] + " / " + item["choices"][choiceIndex]["id"])

		# add symptom
		request.add_symptom(item["id"], item["choices"][choiceIndex]["id"])

	request = api.diagnosis(request)
	# print(request.question.items)

	if request.conditions[0]["probability"] > 0.85:
		doneDiagnosing = True

	print("Top 3 conditions: ~~~")
	if len(request.conditions) > 0:
		print(request.conditions[0])
	
	if len(request.conditions) > 1:
		print(request.conditions[1])

	if len(request.conditions) > 2:
		print(request.conditions[2])

	print("~~~")

print(request.conditions)