# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hostel',
            name='user',
            field=models.ManyToManyField(related_name=b'hostel_stu', null=True, to=b'main.UserProfile', blank=True),
        ),
    ]
