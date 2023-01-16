from typing import Dict, Union
from django.db import models
from django.utils import timezone

from account.models import CustomUser


class PasswordResetManager(models.Manager):
    def reset_password(self):
        pass

    def create_password_reset(self, data: Dict[str, Union[str, int]], user: "CustomUser"):
        prev_resets = PasswordReset.objects.all().filter(user_id=data['uid'])

        for prev_reset in prev_resets:
            prev_reset.delete()

        password_reset = self.model(
            token=data['token'],
            user=user
        )

        password_reset.save()


class PasswordReset(models.Model):

    objects: PasswordResetManager = PasswordResetManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    token = models.TextField(max_length=400)
    user = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name="password_reset"
    )
