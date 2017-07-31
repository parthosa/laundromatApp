# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20170729_0306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='apply_date',
            field=models.CharField(max_length=30, null=True, blank=True),
        ),
    ]
