<script lang="ts">
    import { missingTranslations } from './../missingTranslations';
import { addTranslation } from './helpers';

    $: {
        if ($missingTranslations.last.untranslated) {
            const newTranslation = prompt(`In locale ${$missingTranslations.last.locale}
Enter translation for string:
${$missingTranslations.last.untranslated}`);

            addTranslation($missingTranslations.last.locale, $missingTranslations.last.untranslated, newTranslation);
        }
    }
</script>
