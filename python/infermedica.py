import infermedica_api
import random

api = infermedica_api.API(app_id='de9f4fd9', app_key='675302b9ab8bd6ba22f8868968f74033')

request = infermedica_api.Diagnosis(sex='female', age=70)
request.add_symptom('s_285', 'absent') # weight loss
request.add_symptom('s_13', 'absent') # abdominal pain
request.add_symptom('s_156', 'absent') # nausea
request.add_symptom('s_98', 'present') # fever
request.add_symptom('s_21', 'present') # headache
request.add_symptom('s_119', 'absent') # weakness
request.add_symptom('s_88', 'absent') # shortness of breath
request.add_symptom('s_241', 'absent') # skin lesions

request = api.diagnosis(request)

# print(request)

doneDiagnosing = False

while(request.question and doneDiagnosing == False):
	print("---")
	print(request.question.text + " (" + request.question.type + ")")

	donePresent = False

	for i, item in enumerate(request.question.items):
		if (request.question.type == "group_single" or request.question.type == "single"):
			if donePresent == False:
				choiceIndex = 0
				donePresent = True
			else:
				choiceIndex = 1
				donePresent = True

		else:
			choiceIndex = random.randrange(0,2)
			# choiceIndex = random.randrange(0,len(item["choices"]))

		print("- " + item["name"] + " --> " + item["choices"][choiceIndex]["label"] + " / " + item["choices"][choiceIndex]["id"])

		# add symptom
		request.add_symptom(item["id"], item["choices"][choiceIndex]["id"])

	request = api.diagnosis(request)
	# print(request.question.items)

	if request.conditions[0]["probability"] > 0.85:
		doneDiagnosing = True

	print("No of symptoms: " + str(len(request.symptoms)))
	print(str(request.symptoms))

	# print("Top 3 conditions: ~~~")
	# if len(request.conditions) > 0:
	# 	print(request.conditions[0])
	
	# if len(request.conditions) > 1:
	# 	print(request.conditions[1])

	# if len(request.conditions) > 2:
	# 	print(request.conditions[2])

	# print("~~~")

print("---DIAGNOSIS COMPLETE---")
print(request)