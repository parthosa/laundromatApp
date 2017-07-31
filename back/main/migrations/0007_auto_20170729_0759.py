# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_wash_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='bits_id',
            field=models.CharField(max_length=20, unique=True, null=True),
        ),
    ]
