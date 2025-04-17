from typing import TypeVar, Iterable

from django.db import models

DjangoModelType = TypeVar("DjangoModelType", bound=models.Model)


def model_update(
    *,
    instance: DjangoModelType,
    data: dict[str, any],
    fields: Iterable[str] = None,
) -> tuple[DjangoModelType, bool]:
    """
    Taken from https://github.com/HackSoftware/Django-Styleguide-Example
    Generic update service meant to be reused in local update services.
    """
    has_updated = False
    m2m_data = {}
    update_fields = []
    fields = fields or list(data.keys())

    model_fields = {field.name: field for field in instance._meta.get_fields()}

    for field in fields:
        # Skip if a field is not present in the actual data
        if field not in data:
            continue

        # If field is not an actual model field, raise an error
        model_field = model_fields.get(field)

        assert (
            model_field is not None
        ), f"{field} is not part of {instance.__class__.__name__} fields."

        # If we have m2m field, handle differently
        if isinstance(model_field, models.ManyToManyField):
            m2m_data[field] = data[field]
            continue

        if getattr(instance, field) != data[field]:
            has_updated = True
            update_fields.append(field)
            setattr(instance, field, data[field])

    # Perform an update only if any of the fields were actually changed
    if has_updated:
        instance.full_clean()
        # Update only the fields that are meant to be updated.
        instance.save(update_fields=update_fields)

    for field_name, value in m2m_data.items():
        related_manager = getattr(instance, field_name)
        related_manager.set(value)

        # Still not sure about this.
        # What if we only update m2m relations & nothing on the model? Is this still considered as updated?
        has_updated = True

    return instance, has_updated
