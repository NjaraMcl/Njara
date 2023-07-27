from django import forms
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields["name"].widget.attrs.update(
            {"class": "form-control", "placeholder": "Votre nom"}
        )
        self.fields["email"].widget.attrs.update(
            {"class": "form-control", "placeholder": "Votre adresse e-mail"}
        )
        self.fields["subject"].widget.attrs.update(
            {"class": "form-control", "placeholder": "Sujet du message"}
        )
        self.fields["message"].widget.attrs.update(
            {"class": "form-control", "rows": 4, "placeholder": "Votre message"}
        )
