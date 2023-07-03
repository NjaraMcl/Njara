from django import forms
from main.models import Teacher


class addTeacherForm(forms.ModelForm):
    class Meta:
        model = Teacher
        fields = [
            "nom",
            "prenom",
            "dob",
            "pob",
            "gender",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["nom"].widget.attrs.update(
            {"class": ("form-control"), "placeholder": ("Nom")}
        )
        self.fields["prenom"].widget.attrs.update(
            {"class": ("form-control"), "placeholder": ("Prénom")}
        )
        self.fields["dob"].widget.attrs.update(
            {"class": ("form-control"), "placeholder": ("Date of birth")}
        )
        self.fields["pob"].widget.attrs.update(
            {"class": ("form-control"), "placeholder": ("Place of birth")}
        )
        self.fields["gender"].widget.attrs.update(
            {"class": ("form-control"), "placeholder": ("Gender")}
        )
