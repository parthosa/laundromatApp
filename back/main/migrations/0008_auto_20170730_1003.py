# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20170729_0759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hostel',
            name='short',
            field=models.CharField(max_length=6, null=True),
        ),
    ]
