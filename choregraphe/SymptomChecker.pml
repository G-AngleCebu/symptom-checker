<?xml version="1.0" encoding="UTF-8" ?>
<Package name="SymptomChecker" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="." xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs />
    <Resources>
        <File name="" src=".DS_Store" />
        <File name="__init__" src="lib/infermedica_api/__init__.py" />
        <File name="exceptions" src="lib/infermedica_api/exceptions.py" />
        <File name="__init__" src="lib/infermedica_api/models/__init__.py" />
        <File name="base" src="lib/infermedica_api/models/base.py" />
        <File name="condition" src="lib/infermedica_api/models/condition.py" />
        <File name="diagnosis" src="lib/infermedica_api/models/diagnosis.py" />
        <File name="explain" src="lib/infermedica_api/models/explain.py" />
        <File name="lab_test" src="lib/infermedica_api/models/lab_test.py" />
        <File name="observation" src="lib/infermedica_api/models/observation.py" />
        <File name="risk_factor" src="lib/infermedica_api/models/risk_factor.py" />
        <File name="symptom" src="lib/infermedica_api/models/symptom.py" />
        <File name="webservice" src="lib/infermedica_api/webservice.py" />
    </Resources>
    <Topics />
    <IgnoredPaths>
        <Path src=".metadata" />
    </IgnoredPaths>
</Package>
